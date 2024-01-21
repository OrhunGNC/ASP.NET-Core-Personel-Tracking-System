﻿using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.LateArrival;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.LateArrival
{
    public class LateArrivalReadRepository : ReadRepository<LateArrivalEntity>,ILateArrivalReadRepository
    {
        public LateArrivalReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
