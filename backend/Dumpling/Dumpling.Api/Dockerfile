FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Dumpling.Api/Dumpling.Api.csproj", "Dumpling.Api/"]
RUN dotnet restore "Dumpling.Api/Dumpling.Api.csproj"
COPY . .
WORKDIR "/src/Dumpling.Api"
RUN dotnet build "Dumpling.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dumpling.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dumpling.Api.dll"]
