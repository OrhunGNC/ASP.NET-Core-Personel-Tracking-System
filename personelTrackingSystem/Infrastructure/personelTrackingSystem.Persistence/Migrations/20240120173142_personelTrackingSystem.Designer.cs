﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using personelTrackingSystem.Persistence.Contexts;

#nullable disable

namespace personelTrackingSystem.Persistence.Migrations
{
    [DbContext(typeof(personelTrackingSystemDbContext))]
    [Migration("20240120173142_personelTrackingSystem")]
    partial class personelTrackingSystem
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.25")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.DepartmentEntity", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartmentId"), 1L, 1);

                    b.Property<string>("DepartmentHead")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DepartmentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.EntryEntity", b =>
                {
                    b.Property<int>("EntryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EntryId"), 1L, 1);

                    b.Property<DateTime?>("EntryDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ExitDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonelId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EntryId");

                    b.HasIndex("PersonelId");

                    b.ToTable("EntryEntity");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.PersonelEntity", b =>
                {
                    b.Property<int>("PersonelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PersonelId"), 1L, 1);

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("NameSurname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PersonelId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Personels");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.ProjectEntity", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectId"), 1L, 1);

                    b.Property<int>("PersonelId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ProjectEnd")
                        .HasColumnType("datetime2");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ProjectStart")
                        .HasColumnType("datetime2");

                    b.Property<string>("ProjectStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProjectId");

                    b.HasIndex("PersonelId");

                    b.ToTable("ProjectEntity");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.EntryEntity", b =>
                {
                    b.HasOne("personelTrackingSystem.Domain.Entities.PersonelEntity", "Personel")
                        .WithMany("EntryEntities")
                        .HasForeignKey("PersonelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Personel");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.PersonelEntity", b =>
                {
                    b.HasOne("personelTrackingSystem.Domain.Entities.DepartmentEntity", "Department")
                        .WithMany("Personels")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.ProjectEntity", b =>
                {
                    b.HasOne("personelTrackingSystem.Domain.Entities.PersonelEntity", "Personel")
                        .WithMany("ProjectEntities")
                        .HasForeignKey("PersonelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Personel");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.DepartmentEntity", b =>
                {
                    b.Navigation("Personels");
                });

            modelBuilder.Entity("personelTrackingSystem.Domain.Entities.PersonelEntity", b =>
                {
                    b.Navigation("EntryEntities");

                    b.Navigation("ProjectEntities");
                });
#pragma warning restore 612, 618
        }
    }
}
