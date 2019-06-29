namespace DBRepository.Factories
{
    public interface IDomovoyContextFactory
    {
        DomovoyContext CreateDbContext(string connectionString);
    }
}