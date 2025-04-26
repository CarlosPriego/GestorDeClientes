using GestorDeClientes.Server.Data;
using GestorDeClientes.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestorDeClientes.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ClientManagment _context;

        public ClientController(ClientManagment context)
        {
            _context = context;
        }

        // GET: api/Clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Clients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Clientes.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        // POST: api/Clients
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.Clientes.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

        // PUT: api/Clients/:id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "ID mismatch",
                    Detail = $"El ID de la URL ({id}) no coincide con el ID del cuerpo ({client.Id}).",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound(new ProblemDetails
                    {
                        Title = "Client not found",
                        Detail = $"No se encontró el cliente con ID {id}.",
                        Status = StatusCodes.Status404NotFound
                    });
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/Clients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clientes.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _context.Clientes.Any(e => e.Id == id);
        }
    }

}
