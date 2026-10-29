// Os arquivos e créditos correspondem ao inventário em modelos/CREDITOS.md.
const NASA = 'https://science.nasa.gov/3d-resources/';
const modelo = (id, nome, missao, arquivo, autoria = 'NASA', rotacao = [0, 0, 0]) => ({
 id, nome, missao, arquivo: `../modelos/${arquivo}.glb`, autoria, rotacao,
 estado: 'Conteúdo em desenvolvimento',
 descricao: 'Veja o modelo 3D disponibilizado pela NASA. As peças selecionáveis e a exploração didática deste veículo estão em desenvolvimento.',
 fonte: NASA
});
export const MODELOS_FUTUROS = {
 'modulo-lunar': modelo('modulo-lunar', 'Módulo Lunar', 'APOLLO', 'modulo-lunar', 'NASA / Michael D. Carbajal'),
 hubble: modelo('hubble', 'Hubble', 'OBSERVATÓRIO ESPACIAL', 'hubble'),
 jwst: modelo('jwst', 'James Webb', 'OBSERVATÓRIO ESPACIAL', 'jwst'),
 cassini: modelo('cassini', 'Cassini-Huygens', 'EXPLORAÇÃO DE SATURNO', 'cassini'),
 voyager: modelo('voyager', 'Voyager', 'EXPLORAÇÃO DO SISTEMA SOLAR', 'voyager'),
 parker: modelo('parker', 'Parker Solar Probe', 'EXPLORAÇÃO DO SOL', 'parker'),
 juno: modelo('juno', 'Juno', 'EXPLORAÇÃO DE JÚPITER', 'juno'),
 rosetta: modelo('rosetta', 'Rosetta', 'EXPLORAÇÃO DE COMETAS', 'rosetta'),
 perseverance: modelo('perseverance', 'Perseverance', 'EXPLORAÇÃO DE MARTE', 'perseverance'),
 ingenuity: modelo('ingenuity', 'Ingenuity', 'EXPLORAÇÃO DE MARTE', 'ingenuity')
};
