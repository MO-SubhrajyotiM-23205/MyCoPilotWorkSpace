using Microsoft.EntityFrameworkCore;
using System.Data;

namespace API_CORPUS.Data
{
    public class CorpusDbContext : DbContext
    {
        public CorpusDbContext(DbContextOptions<CorpusDbContext> options) : base(options)
        {
        }

        public DbSet<Corpus> Corpus { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Corpus>().HasNoKey();
        }

        public async Task<List<Corpus>> GetAccountDataAsync(string clientId)
        {
            return await Database.SqlQueryRaw<Corpus>("EXEC USP_PAC_CORPUS_GET_ACCOUNT_DATA {0}", clientId).ToListAsync();
        }
    }
}