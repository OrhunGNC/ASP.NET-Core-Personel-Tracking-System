using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Entry;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Entry
{
    public class EntryReadRepository : ReadRepository<EntryEntity>,IEntryReadRepository
    {
        public EntryReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
