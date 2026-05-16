import styles from './BookTable.module.scss';

export default function Books() {
  return (
    // make dynamic - kanban/drag and drop with book thumbnail ({data.map((project, projectIndex))
    // import book library
    <table>
      <tr>
        <th>TBR</th>
        <th>Reading</th>
        <th>complete</th>
        <th>DNF</th>
      </tr>
      <tr>
        <td>
          <p>Foundation</p>
        </td>
        <td>
          
        </td>
        <td>
          
        </td>
        <td>
          
        </td>
      </tr>
      <tr>
        <td>

        </td>
        <td>
          Pride & Prejuduce
        </td>
        <td>
          
        </td>
        <td>
          
        </td>
      </tr>
      <tr>
        <td>
          War & Peace
        </td>
        <td>
          
        </td>
        <td>
          
        </td>
        <td>
          
        </td>
      </tr>
      <tr>
        <td>
          
        </td>
        <td>
          
        </td>
        <td>
          Grapes of Wrath
        </td>
        <td>
          
        </td>
      </tr>
      <tr>
        <td>
          
        </td>
        <td>
          
        </td>
        <td>
          Treasure Island
        </td>
        <td>
          
        </td>
      </tr>
    </table>
  );
}