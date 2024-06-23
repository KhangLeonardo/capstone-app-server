import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718955771360 implements MigrationInterface {
    name = 'NewMigration1718955771360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_parent" ("studentId" integer NOT NULL, "parentId" integer NOT NULL, CONSTRAINT "PK_1b47f89b07121360c815dcc82e6" PRIMARY KEY ("studentId", "parentId"))`);
        await queryRunner.query(`CREATE TABLE "parent" ("id" SERIAL NOT NULL, "givenName" character varying NOT NULL, "surname" character varying NOT NULL, "emailAddress" character varying, "phoneNumber" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."teacher_gender_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "givenName" character varying NOT NULL, "surname" character varying NOT NULL, "age" integer, "gender" "public"."teacher_gender_enum" NOT NULL, "address" character varying, "phone" character varying, "dateOfBirth" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."daily_schedule_dayofweek_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')`);
        await queryRunner.query(`CREATE TABLE "daily_schedule" ("id" SERIAL NOT NULL, "dayOfWeek" "public"."daily_schedule_dayofweek_enum" NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "classEntityId" integer, "periodId" integer, CONSTRAINT "PK_5f548e5ffcd92ade46ec9de0118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "period" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "schoolYearId" integer, CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_year" ("id" SERIAL NOT NULL, "yearName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_77783460dce6d4d0ded59c4f246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "term" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "termNumber" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "schoolYearId" integer, CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom_type" ("id" SERIAL NOT NULL, "typeName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efd61b648239ad927302799891c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "period" TIMESTAMP NOT NULL, "summary" character varying NOT NULL, "location" character varying NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "classroomTypeId" integer, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subjectId" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "teacherId" integer, "termId" integer, "classroomId" integer, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_class" ("studentId" integer NOT NULL, "classId" integer NOT NULL, "score" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "classEntityId" integer, CONSTRAINT "PK_93902576ee093121067d0146c97" PRIMARY KEY ("studentId", "classId"))`);
        await queryRunner.query(`CREATE TABLE "absence" ("id" SERIAL NOT NULL, "reason" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30089b15c0f880f026581218c16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attendance_status_enum" AS ENUM('Present', 'Absent', 'Late')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "status" "public"."attendance_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" integer, "classEntityId" integer, "absenceId" integer, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "year_level" ("id" SERIAL NOT NULL, "levelName" character varying NOT NULL, "levelOrder" integer NOT NULL, "scoreRangeMin" integer, "scoreRangeMax" integer, "grade" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c64a05ec6caf695e9970d9f98c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_year_level" ("studentId" integer NOT NULL, "yearLevelId" integer NOT NULL, "score" integer NOT NULL, "enrolmentDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_6b67f228e78b1469a525fa0bd70" PRIMARY KEY ("studentId", "yearLevelId"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "toggle_likes" ("user_id" integer NOT NULL, "post_id" integer NOT NULL, CONSTRAINT "PK_9a957e78783dcaad68b34acc7a8" PRIMARY KEY ("user_id", "post_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."students_gender_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "givenName" character varying NOT NULL, "surname" character varying NOT NULL, "middleName" character varying, "gender" "public"."students_gender_enum" NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "emailAddress" character varying, "phoneNumber" character varying, "school_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parent_id" integer, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schools" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "post_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "school_id" integer NOT NULL, "created_by" integer NOT NULL, "status" character varying NOT NULL, "published_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "post_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tags" ("comment_id" integer NOT NULL, "user_id" integer NOT NULL, "placeholder_number" integer NOT NULL, CONSTRAINT "PK_3eb4a770365416f0e773323021f" PRIMARY KEY ("comment_id", "user_id", "placeholder_number"))`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" SERIAL NOT NULL, "access_token" text NOT NULL, "access_token_expiration_time" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "subjectName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_admins" ("user_id" integer NOT NULL, "school_id" integer NOT NULL, CONSTRAINT "PK_433d58a5416656915a4304233f4" PRIMARY KEY ("user_id", "school_id"))`);
        await queryRunner.query(`CREATE TABLE "hashtags" ("id" SERIAL NOT NULL, "tag" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_0b4ef8e83392129fb3373fdb3af" UNIQUE ("tag"), CONSTRAINT "PK_994c5bf9151587560db430018c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_hashtags" ("post_id" integer NOT NULL, "hash_tag_id" integer NOT NULL, "placeholderNumber" integer NOT NULL, CONSTRAINT "PK_18fbfad8d687cce1687e0f734f9" PRIMARY KEY ("post_id", "hash_tag_id", "placeholderNumber"))`);
        await queryRunner.query(`CREATE TABLE "menu_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_246dfbfa0f3b0a4e953f7490544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal" ("id" SERIAL NOT NULL, "mealName" character varying NOT NULL, "description" character varying, "nutritionInfo" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "menuId" integer, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "timeRange" character varying NOT NULL, "description" character varying, "nutritionInfo" character varying, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "menuCategoryId" integer, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_guardian" ("student_id" integer NOT NULL, "guardian_id" integer NOT NULL, CONSTRAINT "PK_9022016ef2693e1d0c92cf7a297" PRIMARY KEY ("student_id", "guardian_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6cc634e8176332de785dc61dac" ON "student_guardian" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_986f782417afbca26a068d5933" ON "student_guardian" ("guardian_id") `);
        await queryRunner.query(`ALTER TABLE "student_parent" ADD CONSTRAINT "FK_d2672fb7379e2ca1ed2607af0ed" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_parent" ADD CONSTRAINT "FK_3c61266c1943e653aac491a66d5" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_schedule" ADD CONSTRAINT "FK_6442cfbe75c98c4ebdc27e35188" FOREIGN KEY ("classEntityId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_schedule" ADD CONSTRAINT "FK_91c42f738236dc1d12e3229ccad" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "period" ADD CONSTRAINT "FK_0675bb856b4384af23b43d9bd7e" FOREIGN KEY ("schoolYearId") REFERENCES "school_year"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "FK_9c1049d814aae3ef3ae1a48cd73" FOREIGN KEY ("schoolYearId") REFERENCES "school_year"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_2a3200c1c40b38ade6c11cddab2" FOREIGN KEY ("classroomTypeId") REFERENCES "classroom_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_d3e7278501fe8c5e8cf2cf74be7" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_5cb843b08982615928069f68c24" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_c23f84a4259210c080dcbadca4d" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_class" ADD CONSTRAINT "FK_54d9dc074a5b2c5a75514e2223f" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_class" ADD CONSTRAINT "FK_b93bb74b56848139a3bf1a44494" FOREIGN KEY ("classEntityId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_120e1c6edcec4f8221f467c8039" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_ab971e28022557a119a20d0d64f" FOREIGN KEY ("classEntityId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_c9e03a43f02a82a9cadd2bfde8f" FOREIGN KEY ("absenceId") REFERENCES "absence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_year_level" ADD CONSTRAINT "FK_799780c1d8f01b70d559f4ab40d" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_year_level" ADD CONSTRAINT "FK_28327b16566a50d0a9f217862bb" FOREIGN KEY ("yearLevelId") REFERENCES "year_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "toggle_likes" ADD CONSTRAINT "FK_54d19a7d2bc3ad9f50f3211c8e1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "toggle_likes" ADD CONSTRAINT "FK_323e11860056ff731f755885102" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_209313beb8d3f51f7ad69214d90" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_ca0ed9873891665fff3d9d39cc2" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_69247d231c2c01f40e0aa4dd4fa" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_5e508187fcc1b87d59e3673c766" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_f1454005e7c0f12311a17bba985" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1876d8f8eff4211b216364381ec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_e9658e959c490b0a634dfc54783" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_admins" ADD CONSTRAINT "FK_a3dfdd5b8a66a0343c0bc0b6266" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_admins" ADD CONSTRAINT "FK_7d7af2ca719ea99824104d57360" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_hashtags" ADD CONSTRAINT "FK_21fdc84b0e3b570a6ecba191bce" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_hashtags" ADD CONSTRAINT "FK_eb8b21c0157634fb28694f97987" FOREIGN KEY ("hash_tag_id") REFERENCES "hashtags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_ecd5d2904e7300d8a07a8dc10f3" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_8de91a054c07898aa59a971f93c" FOREIGN KEY ("menuCategoryId") REFERENCES "menu_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_6cc634e8176332de785dc61dac1" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_986f782417afbca26a068d59339" FOREIGN KEY ("guardian_id") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_986f782417afbca26a068d59339"`);
        await queryRunner.query(`ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_6cc634e8176332de785dc61dac1"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_8de91a054c07898aa59a971f93c"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_ecd5d2904e7300d8a07a8dc10f3"`);
        await queryRunner.query(`ALTER TABLE "posts_hashtags" DROP CONSTRAINT "FK_eb8b21c0157634fb28694f97987"`);
        await queryRunner.query(`ALTER TABLE "posts_hashtags" DROP CONSTRAINT "FK_21fdc84b0e3b570a6ecba191bce"`);
        await queryRunner.query(`ALTER TABLE "school_admins" DROP CONSTRAINT "FK_7d7af2ca719ea99824104d57360"`);
        await queryRunner.query(`ALTER TABLE "school_admins" DROP CONSTRAINT "FK_a3dfdd5b8a66a0343c0bc0b6266"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_e9658e959c490b0a634dfc54783"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_1876d8f8eff4211b216364381ec"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_f1454005e7c0f12311a17bba985"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_5e508187fcc1b87d59e3673c766"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_69247d231c2c01f40e0aa4dd4fa"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_ca0ed9873891665fff3d9d39cc2"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_209313beb8d3f51f7ad69214d90"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "toggle_likes" DROP CONSTRAINT "FK_323e11860056ff731f755885102"`);
        await queryRunner.query(`ALTER TABLE "toggle_likes" DROP CONSTRAINT "FK_54d19a7d2bc3ad9f50f3211c8e1"`);
        await queryRunner.query(`ALTER TABLE "student_year_level" DROP CONSTRAINT "FK_28327b16566a50d0a9f217862bb"`);
        await queryRunner.query(`ALTER TABLE "student_year_level" DROP CONSTRAINT "FK_799780c1d8f01b70d559f4ab40d"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_c9e03a43f02a82a9cadd2bfde8f"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_ab971e28022557a119a20d0d64f"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_120e1c6edcec4f8221f467c8039"`);
        await queryRunner.query(`ALTER TABLE "student_class" DROP CONSTRAINT "FK_b93bb74b56848139a3bf1a44494"`);
        await queryRunner.query(`ALTER TABLE "student_class" DROP CONSTRAINT "FK_54d9dc074a5b2c5a75514e2223f"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_c23f84a4259210c080dcbadca4d"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_5cb843b08982615928069f68c24"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_d3e7278501fe8c5e8cf2cf74be7"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_2a3200c1c40b38ade6c11cddab2"`);
        await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "FK_9c1049d814aae3ef3ae1a48cd73"`);
        await queryRunner.query(`ALTER TABLE "period" DROP CONSTRAINT "FK_0675bb856b4384af23b43d9bd7e"`);
        await queryRunner.query(`ALTER TABLE "daily_schedule" DROP CONSTRAINT "FK_91c42f738236dc1d12e3229ccad"`);
        await queryRunner.query(`ALTER TABLE "daily_schedule" DROP CONSTRAINT "FK_6442cfbe75c98c4ebdc27e35188"`);
        await queryRunner.query(`ALTER TABLE "student_parent" DROP CONSTRAINT "FK_3c61266c1943e653aac491a66d5"`);
        await queryRunner.query(`ALTER TABLE "student_parent" DROP CONSTRAINT "FK_d2672fb7379e2ca1ed2607af0ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_986f782417afbca26a068d5933"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6cc634e8176332de785dc61dac"`);
        await queryRunner.query(`DROP TABLE "student_guardian"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "meal"`);
        await queryRunner.query(`DROP TABLE "menu_category"`);
        await queryRunner.query(`DROP TABLE "posts_hashtags"`);
        await queryRunner.query(`DROP TABLE "hashtags"`);
        await queryRunner.query(`DROP TABLE "school_admins"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "user_sessions"`);
        await queryRunner.query(`DROP TABLE "user_tags"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "schools"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TYPE "public"."students_gender_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "toggle_likes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "student_year_level"`);
        await queryRunner.query(`DROP TABLE "year_level"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "absence"`);
        await queryRunner.query(`DROP TABLE "student_class"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "classroom_type"`);
        await queryRunner.query(`DROP TABLE "term"`);
        await queryRunner.query(`DROP TABLE "school_year"`);
        await queryRunner.query(`DROP TABLE "period"`);
        await queryRunner.query(`DROP TABLE "daily_schedule"`);
        await queryRunner.query(`DROP TYPE "public"."daily_schedule_dayofweek_enum"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TYPE "public"."teacher_gender_enum"`);
        await queryRunner.query(`DROP TABLE "parent"`);
        await queryRunner.query(`DROP TABLE "student_parent"`);
    }

}
