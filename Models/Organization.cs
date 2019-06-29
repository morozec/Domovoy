using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Organizations")]
    public class Organization
    {
        [Key]
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

        [ForeignKey("OrganizationTypeId")]
        public OrganizationType OrganizationType { get; set; }

    }
}
