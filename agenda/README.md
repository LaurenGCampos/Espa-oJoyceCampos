# Agenda do Espaço Joyce Campos

Calendários públicos de novembro e dezembro de 2026 em `/agenda/`.
Os dias começam como `unknown` (A confirmar). A área da Joyce permite marcar
`available` (Disponível) ou `busy` (Ocupado) e trocar a senha.

Os dados estão no projeto Supabase `sqpywbchnirianmtqkix`, tabela
`public.agenda_days`. A migração remota `create_agenda_days` cria a tabela,
as políticas de leitura pública e escrita exclusiva para contas com a
permissão administrativa `app_metadata.agenda_editor = true`.

A chave em `config.js` é publicável. Senhas e chaves secretas não pertencem
ao repositório. A sessão de edição fica somente na memória do navegador;
ao recarregar ou fechar a página, é necessário entrar novamente.

Para marcar: entrar na Área da Joyce, tocar no dia, escolher a
disponibilidade e pressionar Salvar dia. O site confirma somente depois
que o banco devolve a alteração salva. As clientes podem atualizar a
agenda manualmente; a página também consulta o banco a cada minuto e
ao voltar para a aba. Falhas de consulta mostram os dias como A confirmar.

O cadastro administrativo foi concluído com uma função temporária de
provisionamento. A versão ativa dessa função agora responde 410 e não
executa ações administrativas.

O plano gratuito não oferece a verificação de senhas vazadas do Supabase.
Documentação: https://supabase.com/docs/guides/auth/password-security

O envio de e-mails de recuperação exige configurar SMTP no projeto.
Até essa configuração, a troca de senha pode ser feita na área autenticada;
se a senha for perdida, um administrador precisa redefini-la no Supabase.
