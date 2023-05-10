<script setup>
let residents;
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Leeftijd</th>
          <th>Kamernummer</th>
          <th>Noodcontact</th>
          <th>Speciale noden</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bram Colleman</td>
          <td>75</td>
          <td>183</td>
          <td>0487305561</td>
          <td>Rolstoel</td>
          <td class="options">•••</td>
        </tr>
        <tr>
          <td>Bram Colleman</td>
          <td>75</td>
          <td>183</td>
          <td>0487305561</td>
          <td>Rolstoel</td>
          <td class="options">•••</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
table {
    width: 100%;
}
tbody {
    text-align: center;
}
th {
 padding: .75rem 0;   
}
td {
    padding: .5rem 0;
}
.options {
    opacity: .25;
}
</style>
