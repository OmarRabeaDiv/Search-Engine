using Microsoft.EntityFrameworkCore;

namespace Search_Engine_API.Models
{
    public class ProjectContext : DbContext
    {
        public DbSet<WordRecord> WordRecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=SearchDB;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WordRecord>().HasIndex(x => x.Word);
            base.OnModelCreating(modelBuilder);
        }
    }
}
