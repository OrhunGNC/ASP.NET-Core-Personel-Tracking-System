using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.Repositories
{
    public interface IRepository<T> where T: class
    {
    }
}
