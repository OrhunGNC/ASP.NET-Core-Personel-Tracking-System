using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Personel;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Personel
{
    public class PersonelReadRepository : ReadRepository<PersonelEntity>,IPersonelReadRepository
    {
        public PersonelReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
