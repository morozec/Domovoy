namespace Domovoy.ViewModels
{
    /// <summary>
    /// Адрес дома - для автозаполнения при поиске 
    /// </summary>
    public class HouseAddressViewModel
    {
        public int HouseId { get; set; }
        /// <summary>
        /// Адрес
        /// </summary>
        public string Address { get; set; }
    }
}