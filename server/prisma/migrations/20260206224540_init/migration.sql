-- CreateTable
CREATE TABLE "USER" (
    "id_user" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "gender" DECIMAL NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "url_img" VARCHAR(150),
    "phone" VARCHAR(9) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id_favorite" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_property" INTEGER NOT NULL,

    CONSTRAINT "favorite_pk" PRIMARY KEY ("id_favorite")
);

-- CreateTable
CREATE TABLE "image" (
    "id_image" SERIAL NOT NULL,
    "correlative" DECIMAL(3,0) NOT NULL,
    "url_img" VARCHAR(150) NOT NULL,
    "id_property" INTEGER NOT NULL,

    CONSTRAINT "image_pk" PRIMARY KEY ("id_image")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id_invitation" SERIAL NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_accepted" DECIMAL,
    "justification" VARCHAR(300),
    "description" VARCHAR(300),
    "expected_date" TIMESTAMP(6),
    "id_client" INTEGER NOT NULL,
    "id_property" INTEGER NOT NULL,

    CONSTRAINT "invitation_pk" PRIMARY KEY ("id_invitation")
);

-- CreateTable
CREATE TABLE "property" (
    "id_property" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "num_rooms" DECIMAL(4,0) NOT NULL,
    "num_bathrooms" DECIMAL(4,0) NOT NULL,
    "square_meters" DECIMAL(6,2) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "zone" DECIMAL(3,0) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "id_agent" INTEGER NOT NULL,

    CONSTRAINT "property_pk" PRIMARY KEY ("id_property")
);

-- CreateTable
CREATE TABLE "record" (
    "id_record" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_property" INTEGER NOT NULL,

    CONSTRAINT "record_pk" PRIMARY KEY ("id_record")
);

-- CreateIndex
CREATE UNIQUE INDEX "idx_user_email" ON "USER"("email");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_property_fk" FOREIGN KEY ("id_property") REFERENCES "property"("id_property") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_fk" FOREIGN KEY ("id_client") REFERENCES "USER"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_property_fk" FOREIGN KEY ("id_property") REFERENCES "property"("id_property") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_property_fk" FOREIGN KEY ("id_property") REFERENCES "property"("id_property") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_user_fk" FOREIGN KEY ("id_client") REFERENCES "USER"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_user_fk" FOREIGN KEY ("id_agent") REFERENCES "USER"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_property_fk" FOREIGN KEY ("id_property") REFERENCES "property"("id_property") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_user_fk" FOREIGN KEY ("id_client") REFERENCES "USER"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION;
