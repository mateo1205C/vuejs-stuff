let TableBodyComp = {
    template: `
        <tr>
            <th scope="row"><input type="checkbox"/></th>
            <td v-text="numberID"></td>
            <td v-text="numberID + 'First'"></td>
            <td v-text="numberID + 'Last'"></td>
            <td v-text="numberID + 'Handle'"></td>
        </tr>
    `,
    props: {
        numberID: {
            type: Number,
            required: true,
        }
    }
}