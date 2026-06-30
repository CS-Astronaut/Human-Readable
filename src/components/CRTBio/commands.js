export const commands = [
{
    command: "whoami",
    output: "amin"
},
{
    command: "hostnamectl | grep Pretty",
    output: "Pretty hostname: CS-Astronaut"
},
{
    command: "ls",
    output: "about.txt   interests"
},


{
    command: "cat about.txt",
    output: [
        "Computer Science student.",
        "Focused on Computer Vision,",
        "Deep Learning,",
        "and Artificial Intelligence.",
        "while building open-source projects."
    ]
},

{
    command: "ls ~/interests",
    output: [
        "Computer-Vision/",
        "Machine-Learning/",
        "Deep-Learing/",
        "Linux/",
        "Programming/"
    ]
},

{
    command: " cowsay -f tux 'checkout my github!' ",
    output: [
        " _____________________",
        "< checkout my github! >",
        " _____________________",
        "   \\ ",
        "    \\ ",
        "        .--.    ",
        "       |o_o |   ",
        "       |:_/ |   ",
        "      //   \\ \\  ",
        "     (|     | ) ",
        "    /'\\_   _/`\\ ",
        "    \\___)=(___/ "

        ]
        
},


];
