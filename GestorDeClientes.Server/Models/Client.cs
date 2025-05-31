using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestorDeClientes.Server.Models
{
    [Table("Clientes")]
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public String name { get; set; }
        public String surname { get; set; }
        public String job { get; set; }
        public int phoneNumber { get; set; }
        public int age { get; set; }


    }
}
