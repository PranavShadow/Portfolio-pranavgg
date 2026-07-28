import { cache } from 'react';

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    private: boolean;
}

export interface Post {
    id: string;
    title: string;
    brief: string;
    slug: string;
    url: string;
    publishedAt: string;
    readTimeInMinutes?: number;
    coverImage?: string;
    tags: { name: string }[];
    source: 'hashnode' | 'medium' | 'wordpress';
}

interface HashnodePost {
    id: string;
    title: string;
    brief: string;
    slug: string;
    url: string;
    publishedAt: string;
    readTimeInMinutes: number;
    coverImage?: {
        url: string;
    };
    tags: { name: string }[];
}

interface MediumItem {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    categories: string[];
}

interface WordPressPost {
    ID: number;
    title: string;
    URL: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    featured_image: string;
    tags: Record<string, { name: string }>;
    categories: Record<string, { name: string }>;
}

const HASHNODE_QUERY = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            url
            publishedAt
            readTimeInMinutes
            coverImage {
              url
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

export const getProjects = cache(async (): Promise<GitHubRepo[]> => {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const githubUsername = process.env.GITHUB_USERNAME || 'PranavShadow';

        if (!githubToken) {
            console.warn('GitHub token not configured');
            return [];
        }

        const repos: GitHubRepo[] = [];
        let page = 1;

        while (true) {
            const response = await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100&page=${page}&type=owner`,
                {
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'Portfolio-App',
                    },
                    next: {
                        revalidate: 60, // Cache for 60 seconds
                    },
                }
            );

            if (!response.ok) {
                console.error(`GitHub API responded with status ${response.status}`);
                return [];
            }

            const pageRepos: GitHubRepo[] = await response.json();
            if (!Array.isArray(pageRepos) || pageRepos.length === 0) {
                break;
            }

            repos.push(...pageRepos);

            if (pageRepos.length < 100) {
                break;
            }

            page += 1;
        }

        // Only filter out private repos, keep forks
        const publicRepos = repos
            .filter((repo) => !repo.private)
            .sort((a, b) => {
                // Sort by combination of stars and recent updates
                const aScore = a.stargazers_count + (new Date(a.updated_at).getTime() / 1000000);
                const bScore = b.stargazers_count + (new Date(b.updated_at).getTime() / 1000000);
                return bScore - aScore;
            });

        return publicRepos;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
});

export const getPosts = cache(async (): Promise<Post[]> => {
    try {
        const posts: Post[] = [];

        // Fetch from Hashnode
        const hashnodeHost = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
        if (hashnodeHost) {
            try {
                const hashnodeResponse = await fetch('https://gql.hashnode.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': process.env.HASHNODE_API_TOKEN || '',
                    },
                    body: JSON.stringify({
                        query: HASHNODE_QUERY,
                        variables: {
                            host: hashnodeHost,
                            first: 10,
                        },
                    }),
                    next: {
                        revalidate: 60, // Cache for 60 seconds
                    },
                });

                if (hashnodeResponse.ok) {
                    const hashnodeData = await hashnodeResponse.json();
                    const hashnodePosts = hashnodeData?.data?.publication?.posts?.edges || [];

                    hashnodePosts.forEach((edge: { node: HashnodePost }) => {
                        const post = edge.node;
                        posts.push({
                            id: `hashnode-${post.id}`,
                            title: post.title,
                            brief: post.brief,
                            slug: post.slug,
                            url: post.url,
                            publishedAt: post.publishedAt,
                            readTimeInMinutes: post.readTimeInMinutes,
                            coverImage: post.coverImage?.url,
                            tags: post.tags.map(tag => ({ name: tag.name })),
                            source: 'hashnode',
                        });
                    });
                }
            } catch (error) {
                console.error('Error fetching Hashnode posts:', error);
            }
        }

        // Fetch from Medium RSS
        const mediumUsername = process.env.NEXT_PUBLIC_MEDIUM_USERNAME;
        if (mediumUsername) {
            try {
                // Use RSS2JSON service to convert RSS to JSON
                const mediumResponse = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`,
                    {
                        next: {
                            revalidate: 60, // Cache for 60 seconds
                        },
                    }
                );

                if (mediumResponse.ok) {
                    const mediumData = await mediumResponse.json();
                    const mediumPosts = mediumData?.items || [];

                    mediumPosts.slice(0, 10).forEach((post: MediumItem, index: number) => {
                        // Extract brief from content
                        const brief = post.description
                            ?.replace(/<[^>]*>/g, '') // Remove HTML tags
                            ?.substring(0, 200) + '...';

                        posts.push({
                            id: `medium-${index}-${post.link}`,
                            title: post.title,
                            brief: brief || 'No description available',
                            slug: post.link.split('/').pop() || '',
                            url: post.link,
                            publishedAt: post.pubDate,
                            readTimeInMinutes: Math.ceil((post.description?.length || 0) / 200), // Rough estimate
                            coverImage: extractImageFromContent(post.description),
                            tags: post.categories?.map((cat: string) => ({ name: cat })) || [],
                            source: 'medium',
                        });
                    });
                }
            } catch (error) {
                console.error('Error fetching Medium posts:', error);
            }
        }

        // Fetch from WordPress
        const wordpressSite = process.env.NEXT_PUBLIC_WORDPRESS_SITE;
        if (wordpressSite) {
            try {
                const wordpressResponse = await fetch(
                    `https://public-api.wordpress.com/rest/v1.1/sites/${wordpressSite}/posts/?number=10`,
                    {
                        next: {
                            revalidate: 60, // Cache for 60 seconds
                        },
                    }
                );

                if (wordpressResponse.ok) {
                    const wordpressData = await wordpressResponse.json();
                    const wordpressPosts: WordPressPost[] = wordpressData?.posts || [];

                    wordpressPosts.forEach((post) => {
                        const briefText = post.excerpt
                            ?.replace(/<[^>]*>/g, '') // Remove HTML tags
                            ?.trim()
                            ?.substring(0, 200);

                        const tagNames = [
                            ...Object.values(post.tags || {}),
                            ...Object.values(post.categories || {}),
                        ].map((t) => ({ name: t.name }));

                        const wordCount = post.content
                            ?.replace(/<[^>]*>/g, '')
                            ?.split(/\s+/)
                            .filter(Boolean).length || 0;

                        posts.push({
                            id: `wordpress-${post.ID}`,
                            title: post.title,
                            brief: briefText ? `${briefText}...` : 'No description available',
                            slug: post.slug,
                            url: post.URL,
                            publishedAt: post.date,
                            readTimeInMinutes: Math.max(1, Math.ceil(wordCount / 200)),
                            coverImage: post.featured_image || extractImageFromContent(post.content),
                            tags: tagNames,
                            source: 'wordpress',
                        });
                    });
                } else {
                    console.error(`WordPress API responded with status ${wordpressResponse.status}`);
                }
            } catch (error) {
                console.error('Error fetching WordPress posts:', error);
            }
        }

        // Sort by publish date (newest first)
        posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        return posts.slice(0, 20);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
});

function extractImageFromContent(content: string): string | undefined {
    if (!content) return undefined;

    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/) || content.match(/<img[^>]+data-src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : undefined;
}
