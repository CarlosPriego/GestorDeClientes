using GestorDeClientes.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace GestorDeClientes.Server.Data
{
    public class ClientManagment : DbContext
    {
        public ClientManagment(DbContextOptions<ClientManagment> options) : base(options) {
        
        }

        public DbSet<Client> Clientes { get; set; }
    }
}
