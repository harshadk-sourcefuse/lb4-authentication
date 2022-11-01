--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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
-- Name: role; Type: TABLE; Schema: public; Owner: harshad.kadam
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL,
    key text NOT NULL,
    permissions text,
    deleted boolean,
    deleted_on timestamp with time zone,
    deleted_by text
);


ALTER TABLE public.role OWNER TO "harshad.kadam";

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: harshad.kadam
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO "harshad.kadam";

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: harshad.kadam
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: harshad.kadam
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    firstname text NOT NULL,
    middlename text,
    lastname text,
    email text NOT NULL,
    address text,
    phonenumber text,
    createdon timestamp with time zone,
    modifiedon timestamp with time zone,
    clientid text NOT NULL,
    clientsecret text NOT NULL,
    redirecturl text,
    username text NOT NULL,
    password text NOT NULL,
    roleid integer,
    permissions text,
    deleted boolean,
    deleted_on timestamp with time zone,
    deleted_by text
);


ALTER TABLE public."user" OWNER TO "harshad.kadam";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: harshad.kadam
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "harshad.kadam";

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: harshad.kadam
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: harshad.kadam
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: harshad.kadam
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: harshad.kadam
--

COPY public.role (id, name, key, permissions, deleted, deleted_on, deleted_by) FROM stdin;
1	Admin	Admin	["CreateUser","UpdateUser","GetUser"]	f	\N	\N
2	Admin	Super Admin	["CreateUser","UpdateUser","GetUser","DeleteUser","GetRole","CreateRole","DeleteRole","UpdateRole"]	f	\N	\N
3	Subscriber	Subscriber	["GetUser"]	f	\N	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: harshad.kadam
--

COPY public."user" (id, firstname, middlename, lastname, email, address, phonenumber, createdon, modifiedon, clientid, clientsecret, redirecturl, username, password, roleid, permissions, deleted, deleted_on, deleted_by) FROM stdin;
1	Super		Admin	super.admin@sourcefuse.com	MH,IND	1234567890	2022-10-31 20:16:47.224+05:30	\N	superadmin	clientSecret	\N	superadmin	$2b$10$BS2EmfGdCJjfh74dAoU.mOf8dSZKA.RchidYunyF/q7MRyFwhagqu	2	\N	f	\N	\N
2	Normal		Subscribere	subscriber@sourcefuse.com	MH,IND	1234567890	2022-11-01 17:26:49.407+05:30	\N	subscriber	subscriber	\N	subscriber	$2b$10$exAukOOsW508Gj8IsRaKIeoBoetDSVltELWjHzU1qvhX9TL7locRu	3	\N	f	\N  \N
\.


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harshad.kadam
--

SELECT pg_catalog.setval('public.role_id_seq', 3, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harshad.kadam
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: harshad.kadam
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: harshad.kadam
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id, email, clientid, username);


--
-- PostgreSQL database dump complete
--

