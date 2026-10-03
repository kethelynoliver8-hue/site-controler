# Controler Contabilidade — site institucional

Projeto estático em HTML, CSS e JavaScript, sem biblioteca de animação. Abra `index.html` em um navegador ou publique a pasta no GitHub Pages. O submenu Serviços organiza o atendimento em Para empresas e Para pessoa física. A organização atual das páginas está detalhada abaixo.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **o conteúdo** da pasta `controler-contabilidade/` para a raiz do repositório (`index.html` precisa ficar na raiz).
2. Acesse **Settings → Pages → Build and deployment → Deploy from a branch**; escolha `main` e `/ (root)`; salve.
3. Aguarde o link do Pages. Se usar domínio próprio, configure-o em **Settings → Pages → Custom domain** e ajuste o DNS no provedor do domínio.
4. Antes de publicar, ajuste `canonical`, `og:url` e `og:image` em `index.html`, além de `canonical` e `og:url` em todas as páginas internas, para as URLs reais, inclusive se usar endereço `github.io`.

## Onde alterar

- Cena: `assets/images/bg-curitiba.webp` contém Curitiba sem as barras. `assets/images/barras-contabilidade.webp` contém as cinco barras sobre fundo transparente; o SVG `.bars-overlay` em `index.html` recorta cada uma no plano 1920 × 1080 e `styles.css` controla a subida em sequência. Ajuste os retângulos de recorte e a posição do `<image>` se trocar a arte. `assets/images/bg-curitiba-estatico.webp` guarda a composição anterior como referência visual. Conserve a proporção 16:9 e as dimensões 1920 × 1080 da cena.
- Logos: `assets/logo/controler-escura.png` continua no cabeçalho. `assets/logo/controler-rodape.png` é a versão específica do rodapé, com transparência alfa real, elementos escuros claros e detalhes vermelhos preservados. Para substituí-la, troque somente esse arquivo e ajuste `.footer-logo img` em `styles.css` se o recorte transparente da nova imagem for diferente. `controler-oficial.png` guarda a logo original anexada.
- Quem Somos: a seção real fica em `index.html`, logo após o banner, com estilos `.about-*` em `styles.css`. O link do menu aponta para `#quem-somos`.
- Abertura de Empresa: o conteúdo e os links estão em `abertura-de-empresa.html`; os estilos `.opening-*` ficam no fim de `styles.css`. O primeiro item do submenu Serviços aponta para essa página. Seu cabeçalho e rodapé preservam o padrão da home, com links de retorno `index.html#...` para as seções; atualize o texto e a mensagem de WhatsApp da página nesse arquivo.
- Troca de Contador: conteúdo, dúvidas frequentes, links e mensagens iniciais de WhatsApp ficam em `troca-de-contador.html`. Os estilos `.switch-*` ficam no fim de `styles.css`, aproveitando componentes `.opening-*`; o item Troca de Contador do grupo Para empresas aponta para a página. O acordeão usa o elemento nativo `<details>` e funciona por clique, toque e teclado sem JavaScript.
- Planejamento Tributário: conteúdo, perguntas, SEO e mensagens de WhatsApp ficam em `planejamento-tributario.html`; estilos `.tax-*` ficam no fim de `styles.css`. O terceiro item do submenu Serviços aponta para essa página. Seu diagrama é decorativo e o acordeão `<details>` funciona sem JavaScript. Revise o trecho sobre reforma tributária antes de publicar caso as regras vigentes mudem.
- Departamento Pessoal e BPO Financeiro: agora são páginas separadas, `departamento-pessoal.html` e `bpo-financeiro.html`. O endereço anterior mantém uma página de escolha, e seus anchors antigos encaminham automaticamente para o serviço correspondente.
- Imposto de Renda: os textos, SEO e links de WhatsApp ficam em `imposto-de-renda.html`; os estilos `.income-*` ficam no fim de `styles.css`. A página reutiliza o acordeão acessível `.tax-faq` e não pede dados sensíveis em formulário. Antes de publicar, revise qualquer futura inclusão de regras anuais com fontes oficiais atualizadas.
- Telefone/WhatsApp: procure `5541999683970` em todos os arquivos HTML HTML e em `script.js`, e `99968-3970` nos dados e textos exibidos, para substituir o número e as mensagens dos links.
- Avaliações: os seis depoimentos e os respectivos nomes estão em `index.html`, na seção `#depoimentos`, na ordem exibida. Troque o texto diretamente em cada `<blockquote>` e o nome no `<figcaption>`. O link do botão “Ver avaliações no Google” também fica nessa seção. O carrossel de cartões, o indicador, a linha de progresso, o teclado e o gesto de deslizar ficam em `styles.css` e `script.js`.
- Atendimento: campos e assuntos em `index.html`; validação e `buildContactMessage()` em `script.js`. O nome da empresa é opcional. A mensagem usa apenas os dados preenchidos e abre o WhatsApp; o visitante confirma o envio no aplicativo.
- Rodapé: o conteúdo fica no `<footer>` de `index.html`; as regras `.site-footer` e `.footer-*` ficam em `styles.css`. Para alterar o telefone, atualize o texto e o endereço `https://wa.me/...` no bloco `.footer-contact`. Para alterar o endereço, atualize o texto e o parâmetro `query=` do link do Google Maps. O link “Serviços” do rodapé abre o submenu do cabeçalho, que contém os serviços existentes.
- Luzes: `.greenhouse-light` e `.lake-light` em `styles.css` usam `left`, `top`, `width` e `height` percentuais sobre a cena.
- Cores, espaços e duração: variáveis em `:root` em `styles.css`.
- Tipografia: Bebas Neue 400 nos títulos condensados e Inter 400–800 no restante. Os WOFF2 e licenças OFL estão em `assets/fonts/`; os mesmos WOFF2 estão incorporados às declarações `@font-face` no início de `styles.css`. Assim, a fonte final fica disponível com o CSS inicial, sem troca tardia para Impact/Arial. Ao substituir uma fonte, atualize também seu conteúdo na declaração `@font-face`.
- Itens de menu: Quem Somos, Depoimentos, Nosso escritório e Atendimento levam às respectivas seções da home; os itens agrupados do submenu Serviços abrem páginas e seções específicas.

## Verificação sugerida

Teste em 360, 768, 1280 e 1920 px. Verifique menu e submenu com mouse, toque e teclado; links de WhatsApp; preferência do sistema por movimento reduzido; os seis depoimentos por setas e gesto lateral no celular; as seis fotos ampliadas com clique, setas e Esc; o formulário com e sem nome da empresa, nos assuntos de ambos os grupos; e o alinhamento das barras após trocar a imagem.

- Após atualizar no GitHub Pages, o parâmetro de versão em `styles.css?v=20261002-1` força o navegador a buscar a folha corrigida em vez de reaproveitar uma cópia antiga em cache. Atualize esse valor em todas as páginas quando alterar a tipografia futuramente.

- Na home, o recorte mobile da cena e seu degradê ficam no bloco `@media (max-width:767px)` de `styles.css`; a imagem e o SVG das barras continuam no mesmo plano 16:9. Os cards de “Quem Somos” são observados individualmente em `script.js` e permanecem visíveis sem JavaScript ou com movimento reduzido.

- O telefone do rodapé é um link para WhatsApp em todos os HTML; altere o número e a mensagem em todos os arquivos HTML. A barra de rolagem da página é definida no fim de `styles.css`, sem afetar carrosséis internos.

- No banner mobile, o fundo de Curitiba está em `.hero-inner::before` e as cinco barras permanecem no SVG 16:9 da `.scene`, entre o fundo e o texto. `bar-rise-mobile` soma opacidade ao movimento de entrada; `prefers-reduced-motion` as mostra imediatamente. Ajuste somente esse bloco de `@media (max-width:767px)` para mudar o recorte mobile.

## Organização dos serviços — atualização de 02/10/2026

| Página | Conteúdo e destinos do menu |
| --- | --- |
| `abertura-de-empresa.html#constituicao` | Abertura, alterações e baixa; explicações individuais em `#abertura`, `#alteracoes` e `#baixa`. |
| `servicos-empresariais.html` | `#impostos`, `#dados-cadastrais`, `#licenciamentos`, `#declaracoes`, `#consultorias`, `#contabilidade` e `#mei`. Cada seção apresenta o serviço selecionado. |
| `departamento-pessoal.html` | Admissões, desligamentos, folha, encargos, eSocial, FGTS Digital, férias, 13º salário e rescisões. |
| `bpo-financeiro.html` | Fluxo de caixa, análise de custos, formação de preços, orientação financeira e apoio à tomada de decisões. |
| `troca-de-contador.html` | Conteúdo existente, acessível no grupo empresarial. |
| `planejamento-tributario.html` | Conteúdo existente, acessível no grupo empresarial. |
| `imposto-de-renda.html` | Conteúdo existente e novas seções `#regularizacao-ir`, `#autonomo` e `#esocial-domestico`. |
| `departamento-pessoal-bpo-financeiro.html` | Compatibilidade: escolha entre os dois serviços. Links antigos com `#departamento-pessoal` ou `#bpo-financeiro` são encaminhados às novas páginas. |

### Editar menu e formulário

- O menu está em todos os HTML, dentro de `#services-menu`. Cada `.service-group` é um acordeão nativo no mobile e uma coluna aberta no desktop. Ao alterar um destino, atualize todas as páginas.
- Os assuntos do formulário usam `<optgroup>` em `#contact-subject`, em `index.html`. Mantenha os assuntos sincronizados com o menu. “Outro assunto” permanece disponível.
- O número de atendimento está nos links de WhatsApp dos HTML e no endereço construído no evento de envio em `script.js`. Procure `5541999683970` para substituí-lo em todo o projeto.
- A marca do cabeçalho continua usando `assets/logo/controler-escura.png`, sem redesenho, recorte novo ou distorção. As dimensões ampliadas estão nas regras `.brand` e `.nav-bar` de `styles.css`.
- Os estilos das páginas novas reutilizam `.opening-*`; ajustes específicos ficam em `.service-*`. A tipografia aprovada e os assets existentes foram mantidos.
- A galeria não foi alterada nesta atualização.

### Validação desta entrega

Verificadas as nove páginas em 1440 px e em 360, 390 e 430 px: logo sem sobreposição, páginas sem rolagem horizontal, menu e seus grupos, destinos e anchors, um H1 por página e ausência de erros JavaScript. Testados os assuntos Imposto de Renda, BPO Financeiro e Outro assunto com empresa vazia, além de envio com empresa, mensagem e preferência preenchidas. Não há envio automático: o WhatsApp recebe o texto preparado para confirmação pelo visitante.

## Fotografias ilustrativas da home

As três imagens adicionadas são ilustrativas e não representam a equipe nem o escritório real da Controler. A galeria com fotos do escritório permanece inalterada.

- Quem Somos: `assets/images/ilustracao-consultoria.webp`, em `.about-photo`. A legenda DESDE 1992 fica sobre a borda inferior, sem cobrir rostos. Os cards e suas animações permanecem abaixo.
- Chamada entre Quem Somos e Depoimentos: `assets/images/ilustracao-troca-contador.webp`, em `.switch-callout`. O botão abre `troca-de-contador.html`. No celular, o texto fica abaixo da fotografia.
- Atendimento: `assets/images/ilustracao-atendimento.webp`, em `.contact-photo`. O formulário se sobrepõe apenas 32 px à borda direita da fotografia no desktop; em telas menores que 1100 px não há sobreposição.

Cada imagem possui uma versão `-720.webp` para telas menores. As imagens de Quem Somos e Troca de Contador têm versão de 1440 × 960 px; Atendimento usa o original de 1536 × 1024 px convertido diretamente em WebP com qualidade 95, sem ampliação artificial. Ao trocar as fotos, atualize ambas as versões, os atributos `srcset`, `sizes`, `width`, `height` e o texto alternativo em `index.html`. Preserve a proporção ou atualize a proporção declarada no CSS. As imagens usam `loading="lazy"` e dimensões definidas para reservar espaço antes do carregamento.

Os estilos específicos estão no bloco “Fotografias ilustrativas na home” de `styles.css`; a entrada única das imagens é observada no fim de `script.js`. Sem JavaScript, as imagens continuam visíveis; com movimento reduzido, não há animação de entrada. Fontes, banner principal, galeria, avaliações e lógica do formulário foram preservados.

### Correção de enquadramento e nitidez

- A chamada `.switch-callout` apresenta a foto proporcionalmente, com `height: auto`, sem recorte por `cover`. A altura desktop varia de 360 a 520 px; no mobile, foto e conteúdo seguem em sequência.
- `.contact-heading` reserva uma linha exclusiva para o título e todo o texto de apoio, antes da foto e do formulário. A margem negativa de 32 px é apenas horizontal, na borda livre da foto, e é removida abaixo de 1100 px.
- A imagem de Atendimento tem versões de 720 × 480 e 1536 × 1024 px, em qualidade 95. O `srcset`/`sizes` permite selecionar a versão adequada inclusive em densidade 2×, sem filtros de desfoque.

## Nosso escritório
A seção da home mantém a âncora `#galeria` para compatibilidade. A arte completa está em `assets/images/nosso-escritorio.webp`, otimizada a partir do original de 1450 × 1085 px com qualidade 96. Para substituí-la, atualize o arquivo, o texto alternativo e as dimensões do `<img>` em `index.html`. A largura máxima de 820 px equilibra altura e legibilidade, sem recorte. O endereço e o link Como chegar estão em `.office-details`. O mosaico, o modal, os controles e os seis assets antigos foram removidos. A entrada reutiliza o observador `.photo-reveal` e respeita movimento reduzido.


## Google Ads — atualização de 03/10/2026

Tag: `AW-18028044871`. Conversão existente “Botão do WhatsApp”: `AW-18028044871/GXlKCK_5-oscEMfEuJRD`.

Todas as páginas carregam `google-ads.js` e a biblioteca oficial do Google. A exceção de domínio externo é necessária para a medição. A inicialização e os eventos ficam em arquivo JS separado, sem JS inline. Não adicionar a mesma conversão novamente via GTM.

A conversão é enviada uma vez por clique nos links de WhatsApp (cabeçalho, CTAs, rodapé, flutuante) ou por envio válido do formulário. Visitas, links internos e formulário inválido não disparam conversão. Mede intenção de contato, não confirmação de mensagem enviada. Os dados preenchidos e a mensagem não são enviados como parâmetros da conversão.

### Publicar e verificar
1. Substituir os arquivos do site no GitHub pelo conteúdo da pasta do ZIP, incluindo `google-ads.js`. Manter o arquivo CNAME já existente e as configurações de domínio.
2. Aguardar o deploy do GitHub Pages.
3. Abrir Tag Assistant, conectar ao domínio e conferir o ID acima. Testar um link de WhatsApp e um formulário válido: cada ação deve registrar exatamente um evento conversion com o send_to acima. Testar formulário vazio, navegação e recarregamento: nenhum evento conversion.
4. Conferir também uma página interna e mobile. Bloqueadores podem impedir a medição, mas os contatos devem continuar funcionando.

A verificação local cobre o código e a fila de eventos; a recepção pelo Google precisa ser validada após publicar.
