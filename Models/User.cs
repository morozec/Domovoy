
using Microsoft.AspNetCore.Identity;

namespace Models
{
    /// <summary>
    /// Пользователь.
    /// </summary>
    public class User
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public User(string login, string password)
        {
            Login = login;
            Password = password;
        }
    }
}
