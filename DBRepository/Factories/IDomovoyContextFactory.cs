namespace Domovoy.Data.Factories
{
    public interface IDomovoyContextFactory
    {
        DomovoyContext CreateDbContext(string connectionString);
    }
}