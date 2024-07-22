// CHESS
// elements
const squares = document.
  querySelectorAll(".square");
  
// class
class Path{
  constructor(icon, type){
    this.icon = icon;
    this.type = type;
    this.special = false;
    this.idx = undefined;
    this.x = undefined;
    this.y = undefined;
  }
  operateWhite(){
    // white pawn
    if(this.icon == "w-pawn" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      map.forEach(m => {
        for(let i = 1; i < 3; i++){
          let yes = false;
          for(let z = 0; z < size; z++){
            if(y == 6 && x == map[z].x &&
            y-i == map[z].y && map[z].icon
            == undefined){
              squares[z].classList
              .add("path");
              yes = true;
            }
          }
          if(!yes) break;
        }
        if(x == m.x && y-1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        if(x+1 == m.x && y-1 == m.y && !(m
        .icon == undefined) && m
        .icon.startsWith("b")) squares[m
        .idx].classList.add("eat");
        if(x-1 == m.x && y-1 == m.y && !(m
        .icon == undefined) && m
        .icon.startsWith("b")) squares[m
        .idx].classList.add("eat");
        if(x-1 == m.x && y == m.y && !(m
        .icon == undefined) && m.icon == 
        "b-pawn" && m.special) 
        squares[map[m.idx].idx-8]
        .classList.add("special");
        if(x+1 == m.x && y == m.y && !(m
        .icon == undefined) && m.icon == 
        "b-pawn" && m.special)
        squares[map[m.idx].idx-8]
        .classList.add("special");
      });
    }
    // white rook
    if(this.icon == "w-rook" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y-i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x == map[z].x && y-i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y+i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x == map[z].x && y+i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x-i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x+i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // white knight
    if(this.icon == "w-knight" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      map.forEach(m => {
        if(x-1 == m.x && y-2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-1 == m.x && y-2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+1 == m.x && y-2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+1 == m.x && y-2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+2 == m.x && y-1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+2 == m.x && y-1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+2 == m.x && y+1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+2 == m.x && y+1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-1 == m.x && y+2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-1 == m.x && y+2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+1 == m.x && y+2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+1 == m.x && y+2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-2 == m.x && y-1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-2 == m.x && y-1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-2 == m.x && y+1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-2 == m.x && y+1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("b")) squares[m.idx]
        .classList.add("eat");
      });
    }
    // white bishop
    if(this.icon == "w-bishop" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x-i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x+i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x+i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x-i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // white queen
    if(this.icon == "w-queen" &&
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y-i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x == map[z].x && y-i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y+i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x == map[z].x && y+i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x-i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("w")) 
          break;
          else if(x+i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x-i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x+i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x+i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) break;
          else if(x-i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // white king
    if(this.icon == "w-king" && 
      this.type == "move"){
      const x = this.x - 1;
      const y = this.y;
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y-1 == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y-1 == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("b")) squares[m
          .idx].classList.add("eat");
        });
      }
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("b")) squares[m
          .idx].classList.add("eat");
        });
      }
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y+1 == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y+1 == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("b")) squares[m
          .idx].classList.add("eat");
        });
      }
      if(castling && this.special && map[63].special && map[63].icon == "w-rook" && map[62].icon == undefined && map[61].icon == undefined) squares[62].classList
        .add("special");
      if(castling && this.special && map[56].special && map[56].icon == "w-rook" && map[57].icon == undefined && map[58].icon == undefined && map[59].icon == undefined) squares[58].classList
        .add("special");
    }
  }
  operateBlack(){
    // black pawn
    if(this.icon == "b-pawn" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      map.forEach(m => {
        for(let i = 1; i < 3; i++){
          let yes = false;
          for(let z = 0; z < size; z++){
            if(y == 1 && x == map[z].x &&
            y+i == map[z].y && map[z].icon
            == undefined){
              squares[z].classList
              .add("path");
              yes = true;
            }
          }
          if(!yes) break;
        }
        if(x == m.x && y+1 == m.y && m.icon
        == undefined) squares[m.idx]
        .classList.add("path");
        if(x+1 == m.x && y+1 == m.y && !(m
        .icon == undefined) && m
        .icon.startsWith("w")) squares[m
        .idx].classList.add("eat");
        if(x-1 == m.x && y+1 == m.y && !(m
        .icon == undefined) && m
        .icon.startsWith("w")) squares[m
        .idx].classList.add("eat");
        if(x-1 == m.x && y == m.y && !(m
        .icon == undefined) && m.icon == 
        "w-pawn" && m.special) 
        squares[map[m.idx].idx+8]
        .classList.add("special");
        if(x+1 == m.x && y == m.y && !(m
        .icon == undefined) && m.icon == 
        "w-pawn" && m.special)
        squares[map[m.idx].idx+8]
        .classList.add("special");
      });
    }
    // black rook
    if(this.icon == "b-rook" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y-i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x == map[z].x && y-i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y+i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x == map[z].x && y+i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x-i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x+i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // black knight
    if(this.icon == "b-knight" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      map.forEach(m => {
        if(x-1 == m.x && y-2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-1 == m.x && y-2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+1 == m.x && y-2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+1 == m.x && y-2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+2 == m.x && y-1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+2 == m.x && y-1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+2 == m.x && y+1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+2 == m.x && y+1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-1 == m.x && y+2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-1 == m.x && y+2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x+1 == m.x && y+2 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x+1 == m.x && y+2 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-2 == m.x && y-1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-2 == m.x && y-1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
      map.forEach(m => {
        if(x-2 == m.x && y+1 == m.y && m
        .icon == undefined) squares[m.idx]
        .classList.add("path");
        else if(x-2 == m.x && y+1 == m.y &&
        !(m.icon == undefined) && m.icon
        .startsWith("w")) squares[m.idx]
        .classList.add("eat");
      });
    }
    // black bishop
    if(this.icon == "b-bishop" && 
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x-i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x+i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x+i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x-i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // black queen
    if(this.icon == "b-queen" &&
      this.type == "move"){
      const x = this.x;
      const y = this.y;
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y-i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x == map[z].x && y-i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x == map[z].x && y+i == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x == map[z].x && y+i == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x-i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y == map[z]
          .y && !(map[z].icon == undefined)
          && map[z].icon.startsWith("b")) 
          break;
          else if(x+i == map[z].x && y == 
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x-i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y-i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x+i == map[z].x && y-i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y-i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x+i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x+i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x+i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
      for(let i = 1; i < 8; i++){
        let yes = false;
        for(let z = 0; z < size; z++){
          if(x-i == map[z].x && y+i == 
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("b")) break;
          else if(x-i == map[z].x && y+i ==
          map[z].y && map[z].icon == 
          undefined){
            yes = true;
            squares[z].classList
            .add("path");
          } 
          else if(x-i == map[z].x && y+i ==
          map[z].y && !(map[z].icon == 
          undefined) && map[z].icon
          .startsWith("w")) squares[z]
          .classList.add("eat");
        }
        if(!yes) break;
      }
    }
    // black king
    if(this.icon == "b-king" && 
      this.type == "move"){
      const x = this.x - 1;
      const y = this.y;
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y-1 == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y-1 == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("w")) squares[m
          .idx].classList.add("eat");
        });
      }
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("w")) squares[m
          .idx].classList.add("eat");
        });
      }
      for(let i = 0; i < 3; i++){
        map.forEach(m => {
          if(x+i == m.x && y+1 == m.y &&
          m.icon == undefined) squares[m
          .idx].classList.add("path");
          if(x+i == m.x && y+1 == m.y &&
          !(m.icon == undefined) && m.icon
          .startsWith("w")) squares[m
          .idx].classList.add("eat");
        });
      }
      if(castling && this.special && map[7].special && map[7].icon == "b-rook" && map[6].icon == undefined && map[5].icon == undefined) squares[6].classList
        .add("special");
      if(castling && this.special && map[0].special && map[0].icon == "b-rook" && map[1].icon == undefined && map[2].icon == undefined && map[3].icon == undefined) squares[2].classList
        .add("special");
    }
  }
}

// special moves
let turn = "white";
let enPassant = true;
let castling = true;
let pawnPromotion = true;

// variables
const map = [];
const size = squares.length;
// white icons
const wp = "w-pawn";
const wr = "w-rook";
const wk = "w-knight";
const wb = "w-bishop";
const wq = "w-queen";
const wki = "w-king";
// black icons
const bp = "b-pawn";
const br = "b-rook";
const bk = "b-knight";
const bb = "b-bishop";
const bq = "b-queen";
const bki = "b-king";
// icons map
const iconsMap = [
  br, bk, bb, bq, bki, bb, bk, br,
  bp, bp, bp, bp, bp, bp, bp, bp,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  wp, wp, wp, wp, wp, wp, wp, wp,
  wr, wk, wb, wq, wki, wb, wk, wr
];

// generate map
let xpos = 0;
let ypos = 0;
for(let i = 0; i < size; i++){
  const path = 
  new Path(undefined, undefined, 
  undefined);
  path.idx = i;
  path.x = xpos;
  path.y = ypos;
  map.push(path);
  xpos++;
  if(xpos > 7){ xpos = 0; ypos++; }
}

// touches
for(let i = 0; i < size; i++){
  squares[i].addEventListener("click", 
  () => {
    if(!(squares[i].classList.contains("eat")) && squares[i].children[0]
      && turn.charAt(0) == squares[i]
      .children[0].id.charAt(0)){
      squares.forEach(sqr => {
        sqr.classList.remove("selected");
        sqr.classList.remove("special");
        sqr.classList.remove("path");
        sqr.classList.remove("eat");
      });
      map.forEach(m => m.type = 
      undefined);
      squares[i].classList
      .add("selected");
      map[i].type = "move";
    }
    else if(squares[i].classList.contains("path")){
      let idx = 0;
      map.forEach(m => {
        if(!(m.icon == undefined) && m
        .icon.includes("pawn")) m.special 
        = false;
      });
      squares.forEach(e => {
        if(e.classList.contains("selected")){
          if(enPassant && map[idx].icon == "w-pawn" && map[idx].y == 6 && map[i].y == 4) map[i].special = true;
          else if(enPassant && map[idx]
            .icon == "b-pawn" && map[idx]
            .y == 1 && map[i].y == 3)
            map[i].special = true;
          else if(!(map[idx].icon == undefined) && map[idx].icon.includes("king")) map[idx].special = false;
          else if(!(map[idx].icon == undefined) && map[idx].icon.includes("rook")) map[idx].special = false;
          else if(pawnPromotion && map[idx].icon == "w-pawn" && map[i].y == 0){
            promotePawn(squares[i], "w");
            turn = "promote";
          }
          else if(pawnPromotion && map[idx].icon == "b-pawn" && map[i].y == 7){
            promotePawn(squares[i], "b");
            turn = "promote";
          }
          squares[i].appendChild(e
          .children[0]);
          reload();
        }
        idx++;
      });
      playSound("sound/move.mp3");
      if(turn == "white") turn = "black";
      else if(turn == "black")
        turn = "white";
    }
    else if(squares[i].classList.contains("eat")){
      let idx = 0;
      map.forEach(m => {
        if(!(m.icon == undefined) && m
        .icon.includes("pawn")) m.special 
        = false;
      });
      squares.forEach(e => {
        if(e.classList.contains("selected"
        )){
          if(!(map[idx].icon == undefined) && map[idx].icon.includes("king")) map[idx].special = false;
          else if(!(map[idx].icon == undefined) && map[idx].icon.includes("rook")) map[idx].special = false;
          else if(pawnPromotion && map[idx].icon == "w-pawn" && map[i].y == 0){
            promotePawn(squares[i], "w");
            turn = "promote";
          }
          else if(pawnPromotion && map[idx].icon == "b-pawn" && map[i].y == 7){
            promotePawn(squares[i], "b");
            turn = "promote";
          }
          squares[i].removeChild(squares[i]
          .firstChild);
          squares[i].appendChild(e.
          children[0]);
          reload();
        }
        idx++;
      });
      playSound("sound/capture.mp3");
      if(turn == "white") turn = "black";
      else if(turn == "black") 
        turn = "white";
    }
    else if(squares[i].classList.contains("special")){
      let idx = 0;
      squares.forEach(e => {
        if(e.classList.contains("selected"
        )){
          if(!(map[idx].icon == undefined) && map[idx].icon.includes("pawn")){
            squares[i].appendChild(e.
            children[0]);
            for(let j = 0; j < size; j++){
              if(map[j].special && !(map[j].icon == undefined) && map[j].icon.includes("pawn")) squares[j].removeChild(squares[j].firstChild);
            }
            playSound("sound/capture.mp3");
          }
          else if(!(map[idx].icon == undefined) && map[idx].icon.includes("king")){
            squares[i].appendChild(e.children[0]);
            if(map[i+1].special){
              squares[i-1].appendChild
              (squares[i+1].children[0]);
            }
            else if(map[i-2].special){
              squares[i+1].appendChild
              (squares[i-2].children[0]);
            }
            playSound("sound/castle.mp3");
          }
          reload();
        }
        idx++;
      });
      map.forEach(m => {
        if(!(m.icon == undefined) && m
        .icon.includes("pawn")) m.special 
        = false;
      });
      if(turn == "white") turn = "black";
      else turn = "white";
    }
    else reload();
  });
}
  
// functions
function playSound(soundName){
  const sound = new Audio(soundName);
  sound.play();
}

function promotePawn(element, col){
  const pos = element.getBoundingClientRect();
  const container = 
    document.querySelector(".container");
  const box = 
    document.createElement("div");
  box.classList.add("pawn-promote");
  const blackPromote = [
    "rook", "knight", "bishop", "queen"
  ];
  const whitePromote = [
    "queen", "bishop", "knight", "rook"
  ];
  if(col == "w"){
    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.style.top = "0px";
    box.appendChild(arrow);
    box.style.left = String(pos.x) + "px";
    box.style.top = String(pos.y+pos.height) + "px";
    for(let i = 0; i < 4; i++){
      const temp = document.createElement("img");
      temp.classList.add("promote");
      temp.id = "w-" + whitePromote[i];
      temp.setAttribute
      ("src", `white/w-${whitePromote[i]}.png`);
      box.appendChild(temp);
    }
  }
  else if(col == "b"){
    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    box.appendChild(arrow);
    arrow.style.bottom = "0px";
    box.style.left = String(pos.x) + "px";
    box.style.top = String(pos.y-pos.height*5+pos.height/3) + "px";
    for(let i = 0; i < 4; i++){
      const temp = document.createElement("img");
      temp.id = "b-" + blackPromote[i];
      temp.classList.add("promote");
      temp.setAttribute
      ("src", `black/b-${blackPromote[i]}.png`);
      box.appendChild(temp);
    }
  }
  container.appendChild(box);
  const promote = 
    document.querySelectorAll(".promote");
  promote.forEach(p => {
    p.addEventListener("click", () => {
      element.id = p.id;
      if(p.id.startsWith("w")){
        element.children[0].id = p.id;
        element.children[0]
        .setAttribute("src", `white/${p
        .id}.png`);
        box.remove();
        playSound("sound/promote.mp3");
        turn = "black";
      }
      else if(p.id.startsWith("b")){
        element.children[0].id = p.id;
        element.children[0]
        .setAttribute("src", `black/${p
        .id}.png`);
        box.remove();
        playSound("sound/promote.mp3");
        turn = "white";
      }
    });
  });
}

function reload(){
  squares.forEach(sqr => {
    sqr.classList.remove("selected");
    sqr.classList.remove("special");
    sqr.classList.remove("path");
    sqr.classList.remove("eat");
  });
  map.forEach(m => {
    m.icon = undefined;
    m.type = undefined;
  });
}

function generateIcons(){
  for(let i = 0; i < size; i++){
    let color = undefined;
    if(iconsMap[i] === 0) continue;
    else if(iconsMap[i][0] == "w"){
      color = "white";
      if(iconsMap[i] == "w-rook" || iconsMap[i] == "w-king") map[i].special = true; 
    }
    else if(iconsMap[i][0] == "b"){
      color = "black";
      if(iconsMap[i] == "b-rook" || iconsMap[i] == "b-king") map[i].special = true; 
    }
    const icon = document.
    createElement("img");
    icon.setAttribute("src", 
    `${color}/${iconsMap[i]}.png`);
    icon.id = iconsMap[i];
    icon.classList.add("icon");
    squares[i].appendChild(icon);
  }
}

function drawPosition(){
  for(let i = 0; i < size; i++){
    if(squares[i].children[0]){
      map[i].icon = squares[i].
      children[0].id;
    } else continue;
    
    // move
    if(map[i].icon.startsWith("w")) 
    map[i].operateWhite();
    else if(map[i].icon.startsWith("b"))
    map[i].operateBlack();
  }
}

function mainLoop(){
  // initialize
  requestAnimationFrame(mainLoop);
  
  // code
  drawPosition();
}

generateIcons();

// run mainLoop
mainLoop();