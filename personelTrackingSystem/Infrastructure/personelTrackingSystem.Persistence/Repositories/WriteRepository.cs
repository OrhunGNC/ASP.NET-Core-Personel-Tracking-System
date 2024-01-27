using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Domain.Entities.Common;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        private readonly personelTrackingSystemDbContext _context;
        internal DbSet<T> _dbSet;
        public WriteRepository(personelTrackingSystemDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public DbSet<T> Table => _context.Set<T>();

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }



    }
}
