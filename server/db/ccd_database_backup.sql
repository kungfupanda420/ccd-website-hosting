--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: news_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_media (
    id integer NOT NULL,
    img text,
    title text,
    subtext text,
    date text
);


ALTER TABLE public.news_media OWNER TO postgres;

--
-- Name: news_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_media_id_seq OWNER TO postgres;

--
-- Name: news_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_media_id_seq OWNED BY public.news_media.id;


--
-- Name: placement_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.placement_stats (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public.placement_stats OWNER TO postgres;

--
-- Name: placement_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.placement_stats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.placement_stats_id_seq OWNER TO postgres;

--
-- Name: placement_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.placement_stats_id_seq OWNED BY public.placement_stats.id;


--
-- Name: programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programs (
    id bigint NOT NULL,
    title text,
    tags text[],
    details text,
    document text,
    posted text
);


ALTER TABLE public.programs OWNER TO postgres;

--
-- Name: programs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.programs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.programs_id_seq OWNER TO postgres;

--
-- Name: programs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id bigint NOT NULL,
    image text,
    name text,
    "position" text
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id bigint NOT NULL,
    image text,
    name text,
    "position" text
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_id_seq OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: why_recruit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.why_recruit (
    id bigint NOT NULL,
    reason text NOT NULL
);


ALTER TABLE public.why_recruit OWNER TO postgres;

--
-- Name: why_recruit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.why_recruit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.why_recruit_id_seq OWNER TO postgres;

--
-- Name: why_recruit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.why_recruit_id_seq OWNED BY public.why_recruit.id;


--
-- Name: news_media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_media ALTER COLUMN id SET DEFAULT nextval('public.news_media_id_seq'::regclass);


--
-- Name: placement_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.placement_stats ALTER COLUMN id SET DEFAULT nextval('public.placement_stats_id_seq'::regclass);


--
-- Name: programs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Name: why_recruit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.why_recruit ALTER COLUMN id SET DEFAULT nextval('public.why_recruit_id_seq'::regclass);


--
-- Data for Name: news_media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news_media (id, img, title, subtext, date) FROM stdin;
2	/images/news_media/cardimg1.jpg	NIT-C records over 1,000 placements for second consecutive year	The National Institute of Technology-Calicut (NIT-C) has set the bar high once again with over 1,000 placements for the second year in a row. This year, the highest offer was ₹47 lakh per annum (LPA) and the average offer for computer science and engineering students jumped to ₹22.03 LPA, up from ₹20.54 LPA the previous year. Similarly, the average offer to electronics and communication engineering students soared to ₹19.29 LPA from ₹15.34 LPA. The overall average for all students climbed to ₹14.29 LPA from ₹12.91 LPA.	April 13 2023
1	/images/news_media/cardimg.png	An MBA Degree from NITC – SOMS: The Perfect Blend of Rigorous Learning and Placement Power	NIT Calicut’s School of Management Studies (SOMS) offers a top-notch two-year MBA program that is a cut above the rest. The program’s innovative curriculum, great placement and networking opportunities make it a great way to get a job or start your own business. In fact, NIT Calicut’s MBA graduates have an impressive placement record, with an average salary package of more than Rs. 9 lakhs per annum and a placement rate of over 90%. The program offers a range of contemporary specialisations, including Marketing, Finance, Human Resource Management, Operations, and Business Analytics and Systems.	Mar 01 2023
3	/images/news_media/cardimg1.jpg	NIT-C Maintains Stellar Placement records	The National Institute of Technology, Calicut, ( NIT-C), has set an all-time record in campus placements this season. Nearly 950 graduates have been hired by 190 companies during the first phase of the recruitment drive. This year, four B.Tech. students of Computer Science and Engineering secured an annual package of ₹67.6 lakh. The average salary offered to students also increased to ₹13 lakh from the previous year’s ₹11 lakh per annum.\nV. Sajith, Chairman, Centre for Career Development, NIT-C, said that the placement rose by 70% as compared to the same period during 2020-21.	12th March 2023
\.


--
-- Data for Name: placement_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.placement_stats (id, name, value) FROM stdin;
1	studentsPlaced	1172
2	companiesVisited	267
3	totalOffers	1250
4	highestPackage	70
\.


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.programs (id, title, tags, details, document, posted) FROM stdin;
7	Skill Development Program	{Paid,M.Tech,B.Tech}	CCD is planning to organize a Professional Skill Development Certificate Program for S6 students, who will soon enter new placement drives. The program will be conducted in batches of 60 students each. We are planning to have first batch just after the end sem exams and another batch at the end of July. The course is of 06 days with a fee of 1770/-. I would request you to encourage people to join this course. Especially to those who think that they need to work upon their soft skills to better perform during placements.	/documents/active_programs/1688919184804.pdf	9/7/2023
8	Drone Workshop	{Paid}	We hope this message finds you well. As we are well aware, drones have an extensive range of applications in various industries. Their market is continuously expanding, creating abundant job opportunities for individuals interested in this field. Therefore, at NIT Calicut, we strive to provide our students the necessary exposure to the field of drones.\r\nWe are considering organizing a workshop on Drone Data Analytics at NIT Calicut, and we would like to gauge student interest before finalizing the details. The fee for the workshop is 3600/ INR (GST Included) for students. We believe that this workshop can provide valuable knowledge and hands-on experience in the exciting field of drones. The workshop will be conducted in hybrid mode, in which the theoretical lectures will be online and hands-on session with drones will be held offline on campus.	/documents/active_programs/1688919596022.pdf	9/7/2023
10	Turning Adversity Into Oppertunity	{M.Tech,B.Tech}	Problems are opportunities for the brave ready to harness the difficulties. The Centre For Career Development NITC in collaboration with IEEE WIE SBC NITC brings to you the aspiring NITC alumni, PC Musthafa CEO of iD Fresh Food, who has learnt to harness the winds of troubles and sail them towards success. A talk to help realize the mindset that creates opportunities from the "Batter King" on how to crack the codes of internships and placements. Don’t let the unknown waters of internships and placements scare you and learn to find your way through. Join us on 8th July at 12 pm for an enlightening session and get the guidance you require from the owner of a 4000 crore company and learn the cues to success.\r\nIf you wish to be successful and are doubtful about how to deal with placements and internships and what to do after engineering, this is the best session you can be a part of.	/documents/active_programs/1688983749834.pdf	10/7/2023
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, image, name, "position") FROM stdin;
1	/images/our_team/students/ayush.png	Ayush Gupta	Chemical Engineering
4	/images/our_team/students/kavya.png	Kavya N S	Civil Engineering
6	/images/our_team/students/sreehari.png	Sreehari P V	Electronics and Communication Engineering
7	/images/our_team/students/dhamista.png	Banala Dhamista	M Tech in Machine Design
5	/images/our_team/students/mihir.png	Tarush Mihir	Electrical and Electronics Engineering
2	/images/our_team/students/yerram.png	Aditya Yerram	Mechanical Engineering
3	/images/our_team/students/yash.png	Yash Jha	Electrical and Electronics Engineering
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, image, name, "position") FROM stdin;
1	/images/our_team/teachers/praveen.png	Dr. Praveen S	Chairperson
2	/images/our_team/teachers/vijayraj.png	Dr. Vijayraj K	Vice Chairperson (Placement)
3	/images/our_team/teachers/negi.png	Dr. Prateek Negi	Vice Chairperson (Training)
4	/images/our_team/teachers/deepthi.png	Dr. Deepthi B	Vice Chairperson (Internship)
\.


--
-- Data for Name: why_recruit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.why_recruit (id, reason) FROM stdin;
1	Quantitative & Analytical Strength
2	Flexible Internships
3	Competitive Coding Culture
4	Strong Development programming
5	6 year Fully Accredited Programms
6	Strong R&D and Indusrty Interactions
\.


--
-- Name: news_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_media_id_seq', 12, true);


--
-- Name: placement_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.placement_stats_id_seq', 4, true);


--
-- Name: programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.programs_id_seq', 10, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 8, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 4, true);


--
-- Name: why_recruit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.why_recruit_id_seq', 6, true);


--
-- Name: news_media news_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_media
    ADD CONSTRAINT news_media_pkey PRIMARY KEY (id);


--
-- Name: placement_stats placement_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.placement_stats
    ADD CONSTRAINT placement_stats_pkey PRIMARY KEY (id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: why_recruit why_recruit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.why_recruit
    ADD CONSTRAINT why_recruit_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

