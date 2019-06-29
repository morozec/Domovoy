using Microsoft.AspNetCore.Identity;

namespace Domovoy.Models.DomainObjects
{
    /// <summary>
    /// Пользователь.
    /// </summary>
    public class User : IdentityUser<long>
    {
        #region Constructors
        #endregion //Constructors

        #region DataProperties

        /// <summary>
        /// Имя.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Фамилия.
        /// </summary>
        public string LastName { get; set; }

        public string Phone { get; set; }

        #endregion //DataProperties
    }
}
