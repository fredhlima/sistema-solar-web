const grupos=[
 ['mundos-planetas',['sol','mercurio','venus','terra','marte','jupiter','saturno','urano','netuno'],['Sol e planetas','Sun and planets','Sol y planetas']],
 ['mundos-luas-proximas',['lua','fobos','deimos','tritao','caronte'],['Lua e outros satélites','Moon and other satellites','Luna y otros satélites']],
 ['mundos-jupiter',['io','europa','ganimedes','calisto'],['Luas de Júpiter','Jupiter’s moons','Lunas de Júpiter']],
 ['mundos-saturno',['tita','encelado','mimas','reia','japeto'],['Luas de Saturno','Saturn’s moons','Lunas de Saturno']],
 ['mundos-urano',['titania','miranda','ariel','umbriel','oberon'],['Luas de Urano','Uranus’s moons','Lunas de Urano']],
 ['mundos-anaos',['ceres','plutao','eris','haumea','makemake'],['Planetas anões','Dwarf planets','Planetas enanos']],
 ['mundos-asteroides',['cinturao-asteroides','vesta','palas','eros','bennu','apofis'],['Cinturão e asteroides','Belt and asteroids','Cinturón y asteroides']],
 ['mundos-cometas',['cinturao-kuiper','halley','hale-bopp','67p'],['Kuiper e cometas','Kuiper and comets','Kuiper y cometas']]
];
export const TRILHAS_MUNDOS=grupos.map(([id,ids,nomes])=>({id,grupo:'mundos',roteiros:ids.map(id=>'mundo-'+id),textos:Object.fromEntries(['pt','en','es'].map((lang,i)=>[lang,{titulo:nomes[i],descricao:{pt:'Observe, descubra e confira o que aprendeu.',en:'Explore, discover, and check what you learned.',es:'Explora, descubre y comprueba lo aprendido.'}[lang]}]))}));
