const imageFactory=(()=>{
    function createElementId(){
      return Math.random().toString(36).slice(2);
    }

    function getLogo(param){
                let color  = param.color ||'black';
                let width  = param.width ||'100%';
                let height = param.height||'auto';

                var svgData = 'data:image/svg+xml;base64,'+
                btoa(`<svg
   width="105.27644mm"
   height="51.271805mm"
   viewBox="0 0 105.27644 51.271805"
   version="1.1"
   id="svg1"
   sodipodi:docname="logo_spf_final.svg"
   inkscape:version="1.3 (0e150ed6c4, 2023-07-21)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.36945286"
     inkscape:cx="1028.548"
     inkscape:cy="905.3929"
     inkscape:window-width="2560"
     inkscape:window-height="1369"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
  <defs
     id="defs1">
    <rect
       x="180.86633"
       y="315.79837"
       width="374.17322"
       height="194.26385"
       id="rect1" />
  </defs>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(-29.596791,-56.981232)">
    <path
       id="rect2"
       style="fill:${color};stroke:none;stroke-width:0.255814;fill-opacity:1"
       d="M 11.575434 59.929855 L 11.575511 113.48368 L 100.26519 113.48368 L 100.26511 59.929855 L 11.575434 59.929855 z M 36.888629 67.71467 C 39.313103 67.71467 41.375328 68.160356 43.074906 69.051007 C 44.793561 69.924195 46.046697 71.286416 46.834875 73.137574 L 40.163081 79.529106 C 39.451131 78.28918 38.626089 77.354965 37.687309 76.726269 C 36.748529 76.097574 35.583181 75.783132 34.191863 75.783132 C 31.960245 75.783132 30.584988 76.639143 30.065576 78.350592 C 29.869471 78.996751 29.898892 79.511529 30.154226 79.895731 C 30.423335 80.279934 30.858314 80.594376 31.459108 80.838869 C 32.059901 81.083362 32.975495 81.380124 34.205708 81.729399 C 36.234871 82.305703 37.865487 82.969404 39.097776 83.720346 C 40.330065 84.471288 41.180459 85.641741 41.648652 87.230943 C 42.116845 88.820145 41.937574 90.976769 41.110755 93.701115 C 40.358137 96.180969 39.25442 98.319912 37.79933 100.11868 C 36.344239 101.91745 34.554865 103.29735 32.431227 104.25785 C 30.321365 105.21836 27.922888 105.69886 25.236681 105.69886 C 22.288741 105.69886 19.850907 105.13105 17.922471 103.9959 C 16.01311 102.84329 14.664941 101.15806 13.877862 98.940165 L 20.924406 92.469993 C 21.570629 93.971876 22.418587 95.150356 23.467546 96.00608 C 24.53028 96.861804 26.011783 97.28981 27.912791 97.28981 C 29.235231 97.28981 30.267379 97.088932 31.009176 96.687265 C 31.764748 96.285599 32.280072 95.631008 32.555678 94.722893 C 32.772983 94.006878 32.71936 93.412812 32.394099 92.94129 C 32.082613 92.469769 31.561046 92.077123 30.829923 91.762775 C 30.117875 91.430964 29.075004 91.055456 27.700686 90.636325 C 25.963982 90.094949 24.519019 89.431247 23.366207 88.645378 C 22.232471 87.842045 21.451545 86.671592 21.022554 85.134781 C 20.593562 83.59797 20.749498 81.607408 21.491516 79.162481 C 22.249433 76.665164 23.377224 74.560496 24.874691 72.849047 C 26.372158 71.137599 28.146575 69.854124 30.197086 68.9984 C 32.247596 68.142676 34.477931 67.71467 36.888629 67.71467 z M 50.25562 68.26515 L 65.112595 68.26515 C 67.716149 68.26515 69.710151 68.797608 71.094995 69.862897 C 72.498916 70.910723 73.3187 72.386507 73.553737 74.290057 C 73.802549 76.193607 73.534722 78.437545 72.750304 81.022181 C 72.040087 83.362325 70.9808 85.536628 69.572311 87.544961 C 68.182898 89.535829 66.466273 91.151426 64.423138 92.391353 C 62.385304 93.613816 60.119539 94.22502 57.626188 94.22502 L 50.848824 94.22502 L 47.525597 105.17496 L 39.053763 105.17496 L 50.25562 68.26515 z M 78.109217 68.26515 L 99.846909 68.26515 L 97.143886 77.171534 L 83.857359 77.171534 L 81.917575 83.563066 L 94.832032 83.563066 L 92.097078 92.574665 L 79.182621 92.574665 L 75.358524 105.17496 L 66.90736 105.17496 L 78.109217 68.26515 z M 56.087967 76.962189 L 53.472346 85.580588 L 59.134016 85.580588 C 60.346253 85.580588 61.393865 85.16972 62.27664 84.348924 C 63.178491 83.510663 63.828522 82.436636 64.226032 81.126854 C 64.628841 79.799608 64.6079 78.778078 64.163985 78.062064 C 63.72537 77.328586 62.865386 76.962189 61.584272 76.962189 L 56.087967 76.962189 z "
       transform="matrix(1,0,0.30349269,0.95283377,-7.2916666e-7,-8.7499999e-7)" />
  </g>
</svg>`);
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