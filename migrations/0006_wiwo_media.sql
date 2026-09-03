-- Archivos subidos desde el orquestador (wiwo.doom).
--
-- Los bytes viven en la BASE y no en el disco: este sitio corre en una
-- plataforma donde el sistema de archivos es de solo lectura, así que un archivo
-- escrito en `public/` desaparecería en el despliegue siguiente. La base es lo
-- único que ya existe y que sobrevive.
--
-- El identificador es el hash del contenido más la extensión, no el nombre del
-- archivo original. De ahí salen dos cosas: subir dos veces la misma imagen no
-- acumula copias, y la URL se puede cachear para siempre porque no puede pasar a
-- significar otro contenido.
--
-- El esquema es el mismo en todos los sitios: lo consulta @wiwo/contract/server,
-- que es una sola implementación compartida.
create table if not exists wiwo_media (
  id text primary key,
  content_type text not null,
  bytes integer not null,
  data bytea not null,
  written_at timestamptz not null default now()
);
