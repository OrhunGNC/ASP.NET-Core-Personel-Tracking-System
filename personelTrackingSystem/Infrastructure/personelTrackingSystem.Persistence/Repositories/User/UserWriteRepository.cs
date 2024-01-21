using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.User;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.User
{
    public class UserWriteRepository : WriteRepository<UserEntity>,IUserWriteRepository
    {
        public UserWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
