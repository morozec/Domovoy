namespace Domovoy.ViewModels
{
    public class OrganizationViewModel
    {
        public int OrganizationId { get; set; }

        /// <summary>
        /// Наименование организации
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Адрес
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Ссылка на тип организации
        /// </summary>
        public int? OrganizationTypeId { get; set; }

        /// <summary>
        /// Рейтинг организации
        /// </summary>
        public double Rank { get; set; }

        public OrganizationTypeViewModel OrganizationType { get; set; }
    }
}