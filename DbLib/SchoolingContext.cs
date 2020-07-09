namespace DbLib {
    using System;
   
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    public partial class SchoolingContext : Microsoft.EntityFrameworkCore.DbContext {
        public SchoolingContext(DbContextOptions<SchoolingContext> options) : base(options) { }
        public SchoolingContext() { }

        public virtual DbSet<Address> addresses { get; set; }
        public virtual DbSet<Company> companies { get; set; }
        public virtual DbSet<Organizer> organizers { get; set; }
        public virtual DbSet<Person> persons { get; set; }
        public virtual DbSet<Schooling> schoolings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                var con = "server=10.90.90.222;user id=ep;port=3313;database=educationPlanner;password=eDpL2%0!;persistsecurityinfo=True;providerName=;MySql.Data.MySqlClient;";
                optionsBuilder.UseSqlServer(con);
                    
            }
        }



        //protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder) {
            //modelBuilder.Entity<address>()
            //    .Property(e => e.street)
            //    .IsUnicode(false);

            //modelBuilder.Entity<address>()
            //    .Property(e => e.city)
            //    .IsUnicode(false);

            //modelBuilder.Entity<address>()
            //    .Property(e => e.country)
            //    .IsUnicode(false);

            //modelBuilder.Entity<address>()
            //    .HasMany(e => e.companies)
            //    .WithRequired(e => e.address)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<address>()
            //    .HasMany(e => e.schoolings)
            //    .WithRequired(e => e.address)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<company>()
            //    .Property(e => e.name)
            //    .IsUnicode(false);

            //modelBuilder.Entity<company>()
            //    .Property(e => e.phone)
            //    .IsUnicode(false);

            //modelBuilder.Entity<company>()
            //    .Property(e => e.email)
            //    .IsUnicode(false);

            //modelBuilder.Entity<company>()
            //    .HasMany(e => e.persons)
            //    .WithRequired(e => e.company)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<organizer>()
            //    .Property(e => e.name)
            //    .IsUnicode(false);

            //modelBuilder.Entity<organizer>()
            //    .Property(e => e.contact_person)
            //    .IsUnicode(false);

            //modelBuilder.Entity<organizer>()
            //    .Property(e => e.email)
            //    .IsUnicode(false);

            //modelBuilder.Entity<organizer>()
            //    .Property(e => e.website)
            //    .IsUnicode(false);

            //modelBuilder.Entity<organizer>()
            //    .Property(e => e.phone)
            //    .IsUnicode(false);

            //modelBuilder.Entity<organizer>()
            //    .HasMany(e => e.schoolings)
            //    .WithRequired(e => e.organizer)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<person>()
            //    .Property(e => e.firstname)
            //    .IsUnicode(false);

            //modelBuilder.Entity<person>()
            //    .Property(e => e.lastname)
            //    .IsUnicode(false);

            //modelBuilder.Entity<person>()
            //    .Property(e => e.email)
            //    .IsUnicode(false);

            //modelBuilder.Entity<schooling>()
            //    .Property(e => e.name)
            //    .IsUnicode(false);

            //modelBuilder.Entity<schooling>()
            //    .HasMany(e => e.persons)
            //    .WithMany(e => e.schoolings)
            //    .Map(m => m.ToTable("registrations", "educationPlanner").MapLeftKey("schooling_id").MapRightKey("person_id"));
        //}
    }
}
