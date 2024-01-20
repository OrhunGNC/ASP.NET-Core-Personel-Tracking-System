using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Persistence;
using personelTrackingSystem.Persistence.Contexts;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddPersistenceServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<personelTrackingSystemDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("dbconn")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
