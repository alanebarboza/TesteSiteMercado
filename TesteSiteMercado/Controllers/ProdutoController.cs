using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TesteSiteMercado.Models;

namespace TesteSiteMercado.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ProdutoController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Produto.ToListAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var produto = await _context.Produto.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormCollection model)
        {
            Produto produto = JsonConvert.DeserializeObject<Produto>(model.First().Value.ToString());

            if (produto.Id > 0)
            {
                var prod = _context.Produto.FirstOrDefault(x => x.Id == produto.Id);
                prod.Nome = produto.Nome;
                prod.ValorVenda = produto.ValorVenda;
                if (model.Files.Any())
                {
                    var stream = model.Files[0].OpenReadStream();
                    BinaryReader reader = new BinaryReader(stream);
                    byte[] photo = reader.ReadBytes((int)stream.Length);
                    prod.Imagem = photo;
                }
                await _context.SaveChangesAsync();
                return Ok(prod);
            }
            else
            {
                if (model.Files.Any())
                {
                    var stream = model.Files[0].OpenReadStream();
                    BinaryReader reader = new BinaryReader(stream);
                    byte[] photo = reader.ReadBytes((int)stream.Length);
                    produto.Imagem = photo;
                }

                _context.Produto.Add(produto);

                await _context.SaveChangesAsync();
                return Ok(produto);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var prod = _context.Produto.FirstOrDefault(x => x.Id == id);
            _context.Remove(prod);
            await _context.SaveChangesAsync();
            return Ok(prod);
        }

    }
}
