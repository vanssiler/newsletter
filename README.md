INSTALAÇÃO

copie a pasta Palacio para app/code

rode os comandos:

bin/magento module:enable Palacio_Newsletter
bin/magento setup:upgrade
bin/magento setup:static-content:deploy


BLOCOS

Crie um bloco com o identificador newsletter-banner e cadastre uma imagem
Crie um bloco com o identificador newsletter-content e insira o texto que aparecerá acima do formulário

REGRA DE CATÁLOGO

Crie uma regra de catálogo, com cupom fixo e insira o ID da regra no arquivo view/frontend/templates/subscribe.phtml na linha 11
Exemplo: $ruleId = 5;
