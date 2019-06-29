using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("OrganizationTypes")]
    public class OrganizationType
    {
        public int OrganizationTypeId { get; set; }

        /// <summary>
        /// Наименование типа организации
        /// </summary>
        public string Name { get; set; }
    }
}
