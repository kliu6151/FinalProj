

// function CurrTags(props) {
//     return (
//         <div>
//             <GenerateTags data={props.questions} />
//         </div>
//     );
// }

// function GenerateTags(props) {
//     let count = 0;
//     let arrName = [];
//     for(let i = 0; i < props.tagIds.length; i++) {
//         let tID = props.data.questions.tagIds[i]; 
//         for(let j = 0; j < props.data.tags.length; j++) {
//             if(tID === props.data.tags[j].tid) {
//                 var t = document.createElement("span");
//                 this.append(t);
//                 t.append(props.data.tags[j].name);
//                 t.classList.add("questionTag");
//                 arrName.push(props.data.tags[j].name + " ");
//                 count++;
//                 if(count === 4) {
//                     arrName.push(<br></br>);
//                     count = 0;
//                 }
//             }
//         }
//     }
    
//     return arrName;
//   }

//   export default CurrTags;