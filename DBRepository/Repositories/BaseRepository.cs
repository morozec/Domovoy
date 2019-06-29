using DBRepository.Factories;

namespace DBRepository.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; set; }
        protected IDomovoyContextFactory DomovoyContextFactory { get; set; }

        protected BaseRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory)
        {
            ConnectionString = connectionString;
            DomovoyContextFactory = domovoyContextFactory;
        }
    }
}