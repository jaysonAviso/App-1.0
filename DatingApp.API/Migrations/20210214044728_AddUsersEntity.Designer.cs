﻿// <auto-generated />
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatingApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210214044728_AddUsersEntity")]
    partial class AddUsersEntity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0-preview.1.21102.2");

            modelBuilder.Entity("DatingApp.API.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<byte>("PasswordHash")
                        .HasColumnType("INTEGER");

                    b.Property<byte>("PasswordSalt")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DatingApp.API.Models.weather", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("date")
                        .HasColumnType("TEXT");

                    b.Property<string>("summary")
                        .HasColumnType("TEXT");

                    b.Property<int>("temperatureC")
                        .HasColumnType("INTEGER");

                    b.Property<int>("temperatureF")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.ToTable("weathers");
                });
#pragma warning restore 612, 618
        }
    }
}
