-- Piezas publicadas desde el orquestador (wiwo.doom).
--
-- La pieza se guarda ENTERA como JSON, con solo las columnas que hacen falta
-- para consultar proyectadas aparte. El manifest es el esquema, y cada sitio
-- declara campos distintos: una tabla con una columna por campo pediría una
-- migración cada vez que un sitio agrega uno, por cien sitios.
--
-- Las fechas son `date` y no texto porque el contrato las define AAAA-MM-DD, y
-- así la base rechaza una fecha inventada en vez de guardarla. El driver las
-- devuelve como texto en Postgres y en PGLite por igual (ver lib/db.ts).
--
-- El esquema es el mismo en todos los sitios: lo consulta @wiwo/contract/server,
-- que es una sola implementación compartida.
create table if not exists wiwo_articles (
  id text primary key,
  published_at date not null,
  updated_at date not null,
  article jsonb not null,
  written_at timestamptz not null default now()
);

-- El orquestador sincroniza pidiendo lo cambiado desde una fecha: es la
-- consulta caliente.
create index if not exists wiwo_articles_updated on wiwo_articles (updated_at desc);
