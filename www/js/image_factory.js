const imageFactory=(()=>{
    function createElementId(){
      return Math.random().toString(36).slice(2);
    }

    function getLogo(param){
                let color  = param.color ||'black';
                let width  = param.width ||'100%';
                let height = param.height||'auto';

                var svgData = 'data:image/svg+xml;base64,'+btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 180 30">
        <path fill="${color}" stroke="none" stroke-width="0"
        d="M 19.72,8.52 C 19.72,6.86 19.21,5.66 18.2,4.91 17.2,4.15 15.58,3.77 13.33,3.77 H 9.28 V 14 h 4.28 c 2.12,0 3.67,-0.43 4.66,-1.28 1,-0.86 1.5,-2.27 1.5,-4.2 z m 1.97,12.25 c 0,-1.73 -0.62,-3 -1.85,-3.8 -1.22,-0.8 -3.18,-1.2 -5.87,-1.2 H 9.28 v 10.35 c 1.8,0.08 3.72,0.11 5.75,0.11 2.22,0 3.88,-0.44 4.99,-1.32 1.11,-0.89 1.67,-2.27 1.67,-4.14 z M 2.16,28 V 26.97 L 5.52,26.44 V 3.55 L 2.16,3.03 V 2 h 11.96 c 3.33,0 5.76,0.51 7.29,1.52 1.54,1.01 2.31,2.61 2.31,4.81 0,1.58 -0.48,2.93 -1.42,4.05 -0.94,1.1 -2.26,1.84 -3.97,2.21 2.35,0.25 4.17,0.9 5.47,1.97 1.29,1.08 1.93,2.46 1.93,4.14 0,2.4 -0.87,4.22 -2.61,5.46 -1.74,1.23 -4.27,1.84 -7.6,1.84 z m 27,-1.03 3.36,-0.53 V 3.55 L 29.16,3.03 V 2 H 48.8 V 8.28 H 47.52 L 46.89,4.05 C 45.43,3.86 43.32,3.77 40.56,3.77 H 36.28 V 14 h 7.06 l 0.61,-3.12 h 1.25 v 8.04 h -1.25 l -0.61,-3.15 h -7.06 v 10.46 h 5.16 c 3.35,0 5.55,-0.1 6.59,-0.31 l 1.13,-4.84 h 1.28 L 50.06,28 h -20.9 z m 31.12,-10.2 v 9.67 l 3.97,0.53 V 28 H 53.41 v -1.03 l 3.11,-0.53 V 3.55 L 53.16,3.03 V 2 h 11.31 c 3.28,0 5.7,0.56 7.26,1.67 1.57,1.11 2.35,2.89 2.35,5.35 0,1.76 -0.48,3.27 -1.44,4.54 -0.95,1.28 -2.26,2.16 -3.94,2.66 l 7.1,10.22 2.82,0.53 V 28 H 72.36 L 64.98,16.77 Z M 70.19,9.3 C 70.19,7.3 69.7,5.88 68.73,5.03 67.77,4.19 66.06,3.77 63.62,3.77 H 60.28 V 15 h 3.45 c 2.34,0 3.99,-0.43 4.97,-1.3 0.99,-0.87 1.49,-2.34 1.49,-4.4 z m 23.09,17.67 2.97,-0.53 V 4.1567187 L 84.16,26.44 87.25,26.97 V 28 H 79.39 V 26.97 L 82.05,26.44 94.69,3.39 91.48,3.03 V 2 h 19.44 v 6 h -1.26 L 109,4.02 C 107.54,3.85 105.43,3.77 102.67,3.77 H 100 V 14 h 5.48 l 0.6,-3.12 h 1.25 v 8.04 h -1.25 l -0.6,-3.15 H 100 v 10.46 h 3.56 c 3.35,0 5.55,-0.1 6.6,-0.31 L 111.3,21 h 1.26 l -0.36,7 H 93.28 Z M 96.25,4.16 C 0,0 0,0 96.25,4.16 Z M 137.56,3.55 134.05,3.03 V 2 h 8.92 v 1.03 l -3.36,0.52 V 28 h -1.89 L 121.56,4.62 v 21.82 l 3.52,0.53 V 28 h -8.92 v -1.03 l 3.36,-0.53 V 3.55 L 116.16,3.03 V 2 h 7.92 l 13.48,19.2 z M 150.16,28 v -1.03 l 4.15,-0.53 V 3.69 h -1 c -3.29,0 -5.54,0.12 -6.75,0.37 L 146.03,8 h -1.31 V 2 h 23.05 v 6 h -1.33 l -0.53,-3.92 c -0.39,-0.1 -1.25,-0.17 -2.57,-0.24 -1.31,-0.07 -2.75,-0.11 -4.31,-0.11 h -0.95 v 22.71 l 4.17,0.53 V 28 Z M 170,23 c 3.33333,0 3.33333,5 0,5 -3.33333,0 -3.33333,-5 0,-5" /></svg>`);

           return `<img src="${svgData}" style="width:${width};height:${height}">`;
    }

    function getEck(color, image, width, style){
        var pathId='eckpath'+createElementId();

        if(style===undefined)
            style='';

        var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" style="position:absolute;top:0;left:0;width:${width};${style}">
            <defs>
            <clipPath id="${pathId}" clipPathUnits="objectBoundingBox">
                <path
                d="M 0.00,1.00
                C 0.00,1.00 1.00,0.00 1.00,0.00
                1.00,0.00 0.00,0.00 0.00,0.00
                0.00,0.00 0.00,1.00 0.00,1.00 Z" />
            </clipPath>
            </defs>`;
        
        if(image)
            svg+=`<image href ="${image}" width="1" height="1" clip-path="url(#${pathId})" preserveAspectRatio="xMaxYMin slice"></image>`;
        else
            svg+=`<rect width="1" height="1" x="0" y="0" fill="${color}" clip-path="url(#${pathId})"></rect>`;

        return svg+'</svg>';
    }

    function getStripe(param){
        if(!param.target)
            throw 'getStripe: obligatory parameter "target" missing';

        let target  = param.target;              
        let width   = param.width||'100%';
        let height  = param.height||'100%';
        let content = param.content||'';
        let rtl     = param.rtl||false;

        let bgWidth = param.bgWidth||'100%';
        let bgColor = param.bgColor||'auto';
        let bgImage = param.bgImage||'';      
        let id      = param.id||createElementId();  

        if(target instanceof HTMLElement)
            var eTarget = target;
        else
            eTarget = document.querySelector(target);

        if(!rtl)
            var html=`<div id="${id}" style="position:relative;height:${height};width:${width};min-height:1rem;overflow:hidden">${getEck(bgColor,bgImage,bgWidth)}<div style="position:relative;">${content}</div></div>`;
        else
            html=`<div id="${id}" style="position:relative;height:${height};width:${width};min-height:1rem;overflow:hidden">${getEck(bgColor, bgImage, bgWidth, "transform: scaleX(-1);right:0;left:auto")}<div style="position:relative;">${content}</div></div>`;

        eTarget.innerHTML += html;

        return id;
    }

    function getIcon(icon){
        switch(icon){
            case 'grid':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
            case 'stack':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
        }
    }

    function setIcons(){        
        document.querySelectorAll('[data-imagefactory-icon]').forEach((e)=>{
            if(e.hasChildNodes())
                return;

            const i=e.getAttribute('data-imagefactory-icon');
            const icon=getIcon(i);
            e.innerHTML=icon;
        });
    }

    return {
        getLogo:getLogo,
        getStripe:getStripe,
        getIcon:getIcon,
        setIcons:setIcons
    };
})();