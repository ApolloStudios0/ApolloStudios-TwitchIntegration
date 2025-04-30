$(document).ready(function() {
    console.log('[ApolloStudios] [Twitch Integration Live]');
    
    // Dragging functionality
    const container = $('.container');
    const header = $('.header');
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX;
    let initialY;

    // Settings modal functionality
    const settingsButton = $('#settingsButton');
    const settingsModal = $('#settingsModal');
    const closeSettings = $('.close-settings');

    settingsButton.on('click', function() {
        settingsModal.fadeIn(200);
    });

    closeSettings.on('click', function() {
        settingsModal.fadeOut(200);
    });

    $(document).on('click', function(e) {
        if ($(e.target).is(settingsModal)) {
            settingsModal.fadeOut(200);
        }
    });

    $('#justShowChat').on('click', function() {
        settingsModal.fadeOut(200);
        $('.header').hide();
        $('.container').removeClass('slight-background').addClass('chat-only');
        $('.chat-container').css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
        });
        $.post(`https://as-TwitchIntegration/stopUIControl`, JSON.stringify({}));
    });

    $('#slightBackground').on('click', function() {
        settingsModal.fadeOut(200);
        $('.header').hide();
        $('.container').removeClass('chat-only').addClass('slight-background').css('background', '');
        $('.chat-container').css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
        });
        $.post(`https://as-TwitchIntegration/stopUIControl`, JSON.stringify({}));
    });

    $('#closeEntirely').on('click', function() {
        settingsModal.fadeOut(200);
        $('body').addClass('Invisible');
        $.post(`https://as-TwitchIntegration/stopUIControl`, JSON.stringify({}));
    });

    // Custom background color functionality
    $('#customBackground').on('click', function(e) {
        if (!$(e.target).closest('.color-picker-container').length) {
            $(this).find('.color-picker-container').slideToggle(200);
        }
    });

    $('.color-picker-container').on('click', function(e) {
        e.stopPropagation();
    });

    $('#applyBackgroundColor').on('click', function() {
        const color = $('#backgroundColorPicker').val();
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const rgbaColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        
        settingsModal.fadeOut(200);
        $('.header').hide();
        $('.container').removeClass('chat-only slight-background').css('background', rgbaColor);
        $('.resize-handle').hide();
        $('.chat-container').css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
        });
        $.post(`https://as-TwitchIntegration/stopUIControl`, JSON.stringify({}));
    });

    // Add window event listener for UI visibility control
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case 'Transparent':
                // Hide everything except the chat iframe
                $('.header').hide();
                $('.container').removeClass('slight-background').addClass('chat-only');
                $('.chat-container').css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    'height': '100%'
                });
                break;
            case 'ShowEverything':
                // Show all UI elements
                $('body').removeClass('Invisible');
                $('.header').show();
                $('.container').removeClass('chat-only slight-background').css('background', '');
                $('.resize-handle').show();
                $('.chat-container').css({
                    'position': 'relative',
                    'top': 'auto',
                    'left': 'auto',
                    'width': 'auto',
                    'height': 'auto'
                });
                break;
        }
    });

    header.on("mousedown", function(e) {
        if (e.target.id === 'channelInput' || e.target.id === 'loadChat' || e.target.id === 'fontSize') {
            return;
        }

        if (e.target === header[0] || $(e.target).closest('.header').length) {
            isDragging = true;
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
        }
    });

    $(document).on("mousemove", function(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            container.css({
                "transform": "translate3d(" + currentX + "px, " + currentY + "px, 0)"
            });
        }
    });

    $(document).on("mouseup", function() {
        isDragging = false;
    });

    // Resize functionality
    const resizeHandle = $('<div class="resize-handle"></div>');
    container.append(resizeHandle);

    let isResizing = false;
    let resizeStartX, resizeStartY, resizeStartWidth, resizeStartHeight;

    resizeHandle.on('mousedown', function(e) {
        isResizing = true;
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        resizeStartWidth = parseInt(container.width());
        resizeStartHeight = parseInt(container.height());
    });

    $(document).on('mousemove', function(e) {
        if (isResizing) {
            const width = resizeStartWidth + (e.clientX - resizeStartX);
            const height = resizeStartHeight + (e.clientY - resizeStartY);
            
            if (width >= 300 && height >= 200) {
                container.css({
                    width: width,
                    height: height
                });
                $('.chat-container').height(height - $('.header').outerHeight());
            }
        }
    });

    $(document).on('mouseup', function() {
        isResizing = false;
    });

    // Load chat functionality
    $('#loadChat').on('click', function() {
        const channelName = $('#channelInput').val().trim();
        const fontSize = $('#fontSize').val();
        if (channelName) {
            const chatUrl = `https://www.giambaj.it/twitch/jchat/v2/?channel=${channelName}&size=${fontSize}&font=1&animate=true&fade=15&hide_commands=true&stroke=0&shadow=2&small_caps=true`;
            $('#chatFrame').attr('src', chatUrl);
            $.post(`https://as-TwitchIntegration/ChatLoaded`, JSON.stringify({streamerConnectedTo: channelName}));
        }
    });

    // Allow Enter key to load chat
    $('#channelInput').on('keypress', function(e) {
        if (e.which === 13) {
            $('#loadChat').click();
        }
    });
});
