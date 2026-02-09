DROP TABLE IF EXISTS record CASCADE;
DROP TABLE IF EXISTS "USER" CASCADE;
DROP TABLE IF EXISTS property CASCADE;
DROP TABLE IF EXISTS favorite CASCADE;
DROP TABLE IF EXISTS image CASCADE;
DROP TABLE IF EXISTS invitation CASCADE;


CREATE TABLE "USER" (
    id_user    SERIAL NOT NULL,
    email      VARCHAR(30) NOT NULL,
    password   VARCHAR(30) NOT NULL,
    gender     NUMERIC NOT NULL,
    type       VARCHAR(30) NOT NULL,
    name       VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    url_img    VARCHAR(150),
    phone      VARCHAR(9) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY ( id_user )
);

CREATE TABLE property (
    id_property   SERIAL NOT NULL,
    title         VARCHAR(50) NOT NULL,
    type          VARCHAR(30) NOT NULL,
    address       VARCHAR(150) NOT NULL,
    price         NUMERIC(10, 2) NOT NULL,
    description   VARCHAR(300) NOT NULL,
    num_rooms     NUMERIC(4) NOT NULL,
    num_bathrooms NUMERIC(4) NOT NULL,
    square_meters NUMERIC(6, 2) NOT NULL,
    state         VARCHAR(30) NOT NULL,
    zone          NUMERIC(3) NOT NULL,
    created_at    TIMESTAMP NOT NULL,
    id_agent      INTEGER NOT NULL,
    CONSTRAINT property_pk PRIMARY KEY ( id_property ),
    CONSTRAINT property_user_fk FOREIGN KEY ( id_agent )
        REFERENCES "USER" ( id_user ) ON DELETE CASCADE
);

CREATE TABLE favorite (
    id_favorite          SERIAL NOT NULL,
    created_at           TIMESTAMP NOT NULL,
    id_client            INTEGER NOT NULL,
    id_property          INTEGER NOT NULL,
    CONSTRAINT favorite_pk PRIMARY KEY ( id_favorite ),
    CONSTRAINT favorite_property_fk FOREIGN KEY ( id_property )
        REFERENCES property ( id_property ) ON DELETE CASCADE,
    CONSTRAINT favorite_user_fk FOREIGN KEY ( id_client )
        REFERENCES "USER" ( id_user ) ON DELETE CASCADE
);

CREATE TABLE image (
    id_image             SERIAL NOT NULL,
    correlative          NUMERIC(3) NOT NULL,
    url_img              VARCHAR(150) NOT NULL,
    id_property          INTEGER NOT NULL,
    CONSTRAINT image_pk PRIMARY KEY ( id_image ),
    CONSTRAINT image_property_fk FOREIGN KEY ( id_property )
        REFERENCES property ( id_property ) ON DELETE CASCADE
);

CREATE TABLE invitation (
    id_invitation        SERIAL NOT NULL,
    status               VARCHAR(30) NOT NULL,
    created_at           TIMESTAMP NOT NULL,
    updated_at           TIMESTAMP NOT NULL,
    is_accepted          NUMERIC,
    justification        VARCHAR(300),
    description          VARCHAR(300),
    expected_date        TIMESTAMP,
    id_client            INTEGER NOT NULL,
    id_property          INTEGER NOT NULL,
    CONSTRAINT invitation_pk PRIMARY KEY ( id_invitation ),
    CONSTRAINT invitation_property_fk FOREIGN KEY ( id_property )
        REFERENCES property ( id_property ) ON DELETE CASCADE,
    CONSTRAINT invitation_user_fk FOREIGN KEY ( id_client )
        REFERENCES "USER" ( id_user ) ON DELETE CASCADE
);

CREATE TABLE record (
    id_record            SERIAL NOT NULL,
    created_at           TIMESTAMP NOT NULL,
    id_client            INTEGER NOT NULL,
    id_property          INTEGER NOT NULL,
    CONSTRAINT record_pk PRIMARY KEY ( id_record ),
    CONSTRAINT record_property_fk FOREIGN KEY ( id_property )
        REFERENCES property ( id_property ) ON DELETE CASCADE,
    CONSTRAINT record_user_fk FOREIGN KEY ( id_client )
        REFERENCES "USER" ( id_user ) ON DELETE CASCADE
);
