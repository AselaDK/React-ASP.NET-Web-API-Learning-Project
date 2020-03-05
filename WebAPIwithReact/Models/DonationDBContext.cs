using Microsoft.EntityFrameworkCore;

namespace WebAPIwithReact.Models
{
    //connection details , tables
    public class DonationDBContext : DbContext
    {
        //constructor
        public DonationDBContext(DbContextOptions<DonationDBContext> options) : base(options)
        {

        }
        // the corresponding table will be created here
        public DbSet<DCandidate> DCandidates { get; set; }
    }
}
