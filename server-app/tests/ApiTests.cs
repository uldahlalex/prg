﻿using System.Net.Http.Headers;
using System.Net.Http.Json;
using api.Boilerplate.DbHelpers;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using api.Boilerplate.UtilityFunctions;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace tests;

[TestFixture]
public class ApiTests
{
    private readonly TestSetup _setup = new();

    [SetUp]
    public void BeforeEachTest()
    {
        _setup.App.Services.GetService<DbScripts>()!.RebuildDbSchema();
        _setup.App.Services.GetService<DbScripts>()!.SeedDB();
        _setup.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(TestSetup.JwtForTestUser);
    }

    [Test]
    public void SignInTest()
    {
        _setup.HttpClient.DefaultRequestHeaders.Authorization = null;
        var response = _setup.HttpClient.PostAsJsonAsync("/api/signin", _setup.TestUser).Result;
        response.IsSuccessStatusCode.Should().BeTrue();
        response.Content.ReadAsStringAsync().Result.Deserialize<AuthenticationResponseDto>().token.Should()
            .NotBeNullOrEmpty();
    }

    [Test]
    public async Task RegisterTest()
    {
        _setup.HttpClient.DefaultRequestHeaders.Authorization = null;
        var u = new User()
        {
            Id = 42,
            Username = _setup.TestUser.Username + "2",
            Password = _setup.TestUser.Password + "2"
        };
        var response = _setup.HttpClient.PostAsJsonAsync("/api/register", u).Result;
        response.IsSuccessStatusCode.Should().BeTrue();
        response.Content.ReadAsStringAsync().Result.Deserialize<AuthenticationResponseDto>().token.Should()
            .NotBeNullOrEmpty();
    }


    [Test]
    public async Task CreateTodo()
    {
        var response = _setup.HttpClient.PostAsJsonAsync("/api/todos", _setup.TestTodo).Result;
        response.IsSuccessStatusCode.Should().BeTrue();
        response.Content.ReadAsStringAsync().Result.Deserialize<TodoWithTags>().ShouldNotContainNulls();
    }
}