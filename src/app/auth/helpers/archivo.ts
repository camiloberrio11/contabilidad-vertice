import { RegistroArchivoItem } from 'src/app/models/Archivo';

export function construirArbol(
  listadoItems: RegistroArchivoItem[]
) {
  const tree: any = {};
  const roots = [];

  // Crear objeto que contiene todos los nodos del árbol
  for (let i = 0; i < listadoItems.length; i++) {
    const item = listadoItems[i];
    const id = item.data.codigo;
    const parentId = item.data.papaId;
    tree[id] = { ...item, children: tree[id]?.children || [] };

    // Si el nodo no tiene padre, es una raíz del árbol
    if (!parentId) {
      roots.push(tree[id]);
    } else {
      // De lo contrario, lo añades como hijo de su padre correspondiente
      tree[parentId] = tree[parentId] || { children: [] };
      tree[parentId].children.push(tree[id]);
    }
  }

  // Devolver todas las raíces del árbol
  return roots;
}
