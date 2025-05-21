-- Table: public.answer

-- DROP TABLE IF EXISTS public.answer;

CREATE TABLE IF NOT EXISTS public.answer
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    content text COLLATE pg_catalog."default" NOT NULL,
    user_id uuid NOT NULL,
    question_id uuid NOT NULL,
    answer_id uuid,
    CONSTRAINT answer_pkey PRIMARY KEY (id),
    CONSTRAINT fk_answer_self FOREIGN KEY (answer_id)
        REFERENCES public.answer (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answer
    OWNER to postgres;


-- Table: public.result

-- DROP TABLE IF EXISTS public.result;

CREATE TABLE IF NOT EXISTS public.result
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    content text COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    answer_id uuid NOT NULL,
    CONSTRAINT result_pkey PRIMARY KEY (id),
    CONSTRAINT fk_result_answer FOREIGN KEY (answer_id)
        REFERENCES public.answer (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.result
    OWNER to postgres;

