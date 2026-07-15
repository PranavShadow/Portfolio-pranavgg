"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    ChevronLeft,
    ChevronRight,
    Briefcase,
    HeartHandshake,
    Rocket,
    Laptop,
    GraduationCap,
    Sparkles,
    UsersRound,
    type LucideIcon,
} from "lucide-react";

// Icon key registry — assign one of these to each milestone's `type`.
// Add more keys here as your timeline grows (e.g. "award", "move", "launch").
const ICONS: Record<string, LucideIcon> = {
    job: Briefcase,
    volunteer: HeartHandshake,
    project: Rocket,
    freelance: Laptop,
    education: GraduationCap,
    milestone: Sparkles, 
    club : UsersRound,
};

type MilestoneType = keyof typeof ICONS;

interface Milestone {
    month?: string; // optional, e.g. "Mar"
    year: string;
    title: string;
    description: string;
    type: MilestoneType;
}

// Replace with your real milestones — order matters, this drives the zigzag.
// Listed newest first (descending).
const milestones: Milestone[] = [
    {
        year: "Now",
        title: "Building the Future",
        description:
            "Focused on building impactful software products, contributing to open source, and exploring AI-powered applications.",
        type: "milestone",
    },
    {
        month: "Jul",
        year: "2026",
        title: "Launched LinkGuru",
        description:
            "LinkGuru is a URL Classification Engine built for chaotic internet users. Save links instantly, organize them automatically, and find what you need in seconds—no more endless searching through tabs, bookmarks, or chats.",
        type: "project",
    },
    {
        month: "Jul",
        year: "2026",
        title: "Software Developer Intern • CloudCache",
        description:
            "Built production-ready software, collaborated on scalable backend systems, and contributed to the development of modern cloud-based applications in a fast-paced engineering environment.",
        type: "job",
    },{
        month: "Jun",
        year: "2026",
        title: "Software Developer Intern • DM IT Solutions",
        description:
            "Developed full-stack web applications, integrated REST APIs, optimized database operations, and delivered responsive features using modern development practices.",
        type: "job",
    },
    {
        month: "Mar",
        year: "2025",
        title: "Technical Team Member • Technovation",
        description:
            "Contributed to the college networking club by solving technical challenges, mentoring peers, and organizing developer-focused initiatives.",
        type: "club",
    },
    {
        month: "Oct",
        year: "2024",
        title: "Technical Coordinator • Kalakrit",
        description:
            "Led the technical and creative side of the cultural club, designing graphics, illustrations, branding assets, and digital experiences for major events.",
        type: "club",
    },
    {
        month: "May",
        year: "2024",
        title: "Founded Reflections",
        description:
            "Started a creative community dedicated to storytelling, photography, literature, and preserving everyday moments through visual narratives.",
        type: "club",
    },
    {
        month: "Nov",
        year: "2023",
        title: "Proprietor • Shankar Studio",
        description:
            "Founded and operated a design studio delivering branding, graphics, promotional content, and digital solutions for local businesses.",
        type: "freelance",
    },
    {
        month: "Oct",
        year: "2023",
        title: "Market Research Intern • HappiMynd",
        description:
            "Worked on digital marketing campaigns, market research, and spreading awareness of HappiLIFE under the Torchbearer Program.",
        type: "job",
    },
    {
        month: "Oct",
        year: "2023",
        title: "Volunteer • Light de Literacy",
        description:
            "Taught underprivileged students from Sarvodaya Nagar and Samrat Camp, helping improve access to quality education.",
        type: "volunteer",
    },
    {
        month: "Mar",
        year: "2023",
        title: "Developer • Books, Coffee and Dreams",
        description:
            "Redesigned the community Discord server, managed automations with webhooks, and handled community technical infrastructure.",
        type: "volunteer",
    },
    {
        month: "Jul",
        year: "2021",
        title: "Tech Head • Brilliance",
        description:
            "Managed social media, edited promotional videos, and produced branding content for the organization.",
        type: "volunteer",
    },
    {
        month: "Jul",
        year: "2021",
        title: "Event Head • Skyline",
        description:
            "Led a team of 25 members to organize an inter-school technical and literary event while managing sponsorships and promotions.",
        type: "club",
    },
    {
        month: "Aug",
        year: "2019",
        title: "Graphic Designer • Om Enterprises",
        description:
            "Created vector illustrations, marketing creatives, corporate videos, and promotional material for business branding.",
        type: "freelance",
    },
    {
        month: "May",
        year: "2018",
        title: "Teacher • Brainly",
        description:
            "Earned the 'Genius' title by answering over 800 academic questions across multiple subjects, helping thousands of learners.",
        type: "volunteer",
    },
    {
        month: "Jun",
        year: "2017",
        title: "NCC Volunteer • International Diabetes Federation",
        description:
            "Participated in the World Diabetes Day awareness walk, promoting prevention, early detection, and healthy living.",
        type: "volunteer",
    },
];

const SCROLL_AMOUNT = 320;
const CARD_WIDTH = 190; // px
const EXPAND_WIDTH = 120; // px - how much extra width to add directionally
const MARKER_SIZE = 30; // px, diameter of the icon marker on the line
const DATE_OFFSET = 24; // px, distance from the line to the date label
const CARD_OFFSET = 52; // px, distance from the line to the card edge

export function ExperienceSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateScrollState();
        const onResize = () => updateScrollState();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({
            left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 p-20 opacity-20 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-20 opacity-20 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Timeline
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A few of the moments that shaped where I am today, in order.
                    </p>
                </div>

                <div className="relative">
                    {/* Edge fades signal there's more to scroll */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-20" />

                    {/* Arrow controls */}
                    <button
                        type="button"
                        aria-label="Scroll timeline left"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground/70 transition-all duration-300 hover:border-primary/40 hover:text-foreground disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Scroll timeline right"
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground/70 transition-all duration-300 hover:border-primary/40 hover:text-foreground disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Scrollable track */}
                    <div
                        ref={scrollRef}
                        onScroll={updateScrollState}
                        className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div className="relative flex items-stretch h-[440px] gap-x-20 px-16 md:px-24 w-max">
                            {/* Horizontal line */}
                            <div className="absolute left-0 right-0 top-1/2 h-px bg-border -translate-y-1/2 pointer-events-none" />

                            {milestones.map((m, index) => {
                                const isAbove = index % 2 === 0;
                                const Icon = ICONS[m.type] ?? Sparkles;
                                const dateLabel = m.month ? `${m.month} ${m.year}` : m.year;
                                return (
                                    <motion.div
                                        key={m.year + m.title}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                                        className="relative h-full flex-shrink-0 group"
                                        style={{ width: CARD_WIDTH }}
                                    >
                                        {/* Connector: line -> card */}
                                        <div
                                            className="absolute left-1/2 w-px bg-border/60 -translate-x-1/2"
                                            style={{
                                                top: isAbove ? `calc(50% - ${CARD_OFFSET}px)` : "50%",
                                                height: CARD_OFFSET,
                                            }}
                                        />

                                        {/* Icon marker, pinned exactly on the line */}
                                        <div
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-card border border-border/70 flex items-center justify-center text-foreground/60 transition-colors duration-300 group-hover:border-primary/60 group-hover:text-primary"
                                            style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                                        >
                                            <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                                        </div>

                                        {/* Date, written close to the line */}
                                        <span
                                            className="absolute left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground whitespace-nowrap"
                                            style={{
                                                top: isAbove
                                                    ? `calc(50% - ${DATE_OFFSET}px)`
                                                    : `calc(50% + ${DATE_OFFSET}px)`,
                                                transform: isAbove
                                                    ? "translate(-50%, -100%)"
                                                    : "translate(-50%, 0%)",
                                            }}
                                        >
                                            {dateLabel}
                                        </span>

                                        {/* Flash card: title only, description on hover */}
                                        <div
                                            className="absolute"
                                            style={{
                                                // Center the inner flash card on the marker (50% left)
                                                left: `50%`,
                                                width: CARD_WIDTH + EXPAND_WIDTH,
                                                top: isAbove
                                                    ? `calc(50% - ${CARD_OFFSET}px)`
                                                    : `calc(50% + ${CARD_OFFSET}px)`,
                                                // Center horizontally over the marker
                                                transform: isAbove ? "translate(-50%, -100%)" : "translate(-50%, 0%)",
                                            }}
                                        >
                                            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-md px-3.5 py-3 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-card/90 group-hover:shadow-lg">
                                                <h3 className="text-sm font-semibold text-foreground leading-snug">
                                                    {m.title}
                                                </h3>
                                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                                                    <div className="overflow-hidden">
                                                        <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                                                            {m.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}